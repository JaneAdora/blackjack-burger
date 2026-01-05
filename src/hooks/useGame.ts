import { useState, useCallback } from 'react';
import type {
  GameState,
  GameMode,
  Player,
  Card,
  IngredientType,
  RoundResult,
} from '../types';
import { TOTAL_INGREDIENTS } from '../types';
import {
  createDeck,
  shuffleDeck,
  dealCard,
  calculateHandValue,
  isBlackjack,
  isBust,
} from '../utils/deck';

const STARTING_TOKENS = 10;

function createInitialState(): GameState {
  return {
    screen: 'title',
    mode: 'single',
    players: [],
    currentPlayerIndex: 0,
    deck: [],
    playerHand: [],
    dealerHand: [],
    currentWager: 1,
    targetIngredient: null,
    roundResult: null,
    startingTokens: STARTING_TOKENS,
  };
}

function createPlayer(name: string): Player {
  return {
    id: crypto.randomUUID(),
    name,
    tokens: STARTING_TOKENS,
    ingredients: [],
  };
}

export function useGame() {
  const [state, setState] = useState<GameState>(createInitialState);

  const currentPlayer = state.players[state.currentPlayerIndex];

  // Navigation
  const goToTitle = useCallback(() => {
    setState(createInitialState());
  }, []);

  const goToModeSelect = useCallback(() => {
    setState((s) => ({ ...s, screen: 'mode-select' }));
  }, []);

  const selectMode = useCallback((mode: GameMode) => {
    setState((s) => ({ ...s, mode, screen: 'player-setup' }));
  }, []);

  const startGame = useCallback((playerNames: string[]) => {
    const players = playerNames.map(createPlayer);
    setState((s) => ({
      ...s,
      players,
      currentPlayerIndex: 0,
      screen: 'ingredient-select',
    }));
  }, []);

  // Ingredient selection
  const selectIngredient = useCallback((ingredient: IngredientType) => {
    setState((s) => ({
      ...s,
      targetIngredient: ingredient,
      screen: 'wager',
    }));
  }, []);

  // Wager
  const setWager = useCallback((amount: number) => {
    setState((s) => ({
      ...s,
      currentWager: Math.min(Math.max(1, amount), currentPlayer?.tokens || 1),
    }));
  }, [currentPlayer?.tokens]);

  const confirmWager = useCallback(() => {
    // Deal initial cards
    let deck = shuffleDeck(createDeck());
    const playerHand: Card[] = [];
    const dealerHand: Card[] = [];

    // Deal 2 cards to player
    let result = dealCard(deck);
    playerHand.push(result.card);
    deck = result.deck;

    result = dealCard(deck);
    playerHand.push(result.card);
    deck = result.deck;

    // Deal 2 cards to dealer (one face down)
    result = dealCard(deck);
    dealerHand.push(result.card);
    deck = result.deck;

    result = dealCard(deck, false); // Face down
    dealerHand.push(result.card);
    deck = result.deck;

    setState((s) => ({
      ...s,
      deck,
      playerHand,
      dealerHand,
      screen: 'playing',
      roundResult: null,
    }));
  }, []);

  // Game actions
  const hit = useCallback(() => {
    setState((s) => {
      const { card, deck } = dealCard(s.deck);
      const playerHand = [...s.playerHand, card];

      if (isBust(playerHand)) {
        return {
          ...s,
          deck,
          playerHand,
          roundResult: 'bust',
          screen: 'round-result',
        };
      }

      return { ...s, deck, playerHand };
    });
  }, []);

  const stand = useCallback(() => {
    setState((s) => {
      // Reveal dealer's hole card
      let dealerHand = s.dealerHand.map((c) => ({ ...c, faceUp: true }));
      let deck = [...s.deck];

      // Dealer draws until 17+
      while (calculateHandValue(dealerHand) < 17) {
        const result = dealCard(deck);
        dealerHand = [...dealerHand, result.card];
        deck = result.deck;
      }

      // Determine winner
      const playerValue = calculateHandValue(s.playerHand);
      const dealerValue = calculateHandValue(dealerHand);
      const playerBJ = isBlackjack(s.playerHand);
      const dealerBJ = isBlackjack(dealerHand);

      let roundResult: RoundResult;

      if (playerBJ && !dealerBJ) {
        roundResult = 'blackjack';
      } else if (dealerBJ && !playerBJ) {
        roundResult = 'lose';
      } else if (playerBJ && dealerBJ) {
        roundResult = 'push';
      } else if (isBust(dealerHand)) {
        roundResult = 'win';
      } else if (playerValue > dealerValue) {
        roundResult = 'win';
      } else if (dealerValue > playerValue) {
        roundResult = 'lose';
      } else {
        roundResult = 'push';
      }

      return {
        ...s,
        deck,
        dealerHand,
        roundResult,
        screen: 'round-result',
      };
    });
  }, []);

  // Process round result
  const processResult = useCallback(() => {
    setState((s) => {
      const players = [...s.players];
      const player = { ...players[s.currentPlayerIndex] };
      const { roundResult, currentWager, targetIngredient } = s;

      // Apply result to player
      switch (roundResult) {
        case 'blackjack':
          player.tokens += currentWager; // Win double (kept original + won same amount)
          if (targetIngredient && !player.ingredients.includes(targetIngredient)) {
            player.ingredients = [...player.ingredients, targetIngredient];
          }
          break;
        case 'win':
          // Keep wager + ingredient
          if (targetIngredient && !player.ingredients.includes(targetIngredient)) {
            player.ingredients = [...player.ingredients, targetIngredient];
          }
          break;
        case 'lose':
        case 'bust':
          player.tokens -= currentWager;
          break;
        case 'push':
          // Keep tokens, no ingredient
          break;
      }

      players[s.currentPlayerIndex] = player;

      // Check win/lose conditions
      if (player.ingredients.length === TOTAL_INGREDIENTS) {
        return { ...s, players, screen: 'victory' };
      }

      if (player.tokens <= 0) {
        // In multiplayer, this player is out; in single player, game over
        if (s.mode === 'single') {
          return { ...s, players, screen: 'game-over' };
        }
        // For multiplayer, we could eliminate player or just skip - for now, game over for that player
      }

      // Move to next player or continue
      if (s.mode === 'multiplayer' && s.players.length > 1) {
        const nextIndex = (s.currentPlayerIndex + 1) % s.players.length;
        return {
          ...s,
          players,
          currentPlayerIndex: nextIndex,
          screen: 'pass-device',
          currentWager: 1,
          targetIngredient: null,
          playerHand: [],
          dealerHand: [],
        };
      }

      return {
        ...s,
        players,
        screen: 'ingredient-select',
        currentWager: 1,
        targetIngredient: null,
        playerHand: [],
        dealerHand: [],
      };
    });
  }, []);

  const continueAfterPass = useCallback(() => {
    setState((s) => {
      const player = s.players[s.currentPlayerIndex];
      if (player.tokens <= 0) {
        return { ...s, screen: 'game-over' };
      }
      if (player.ingredients.length === TOTAL_INGREDIENTS) {
        return { ...s, screen: 'victory' };
      }
      return { ...s, screen: 'ingredient-select' };
    });
  }, []);

  const restartGame = useCallback(() => {
    setState(createInitialState());
  }, []);

  return {
    state,
    currentPlayer,
    actions: {
      goToTitle,
      goToModeSelect,
      selectMode,
      startGame,
      selectIngredient,
      setWager,
      confirmWager,
      hit,
      stand,
      processResult,
      continueAfterPass,
      restartGame,
    },
  };
}
