// Card types
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

// Ingredient types
export type IngredientType =
  | 'top-bun' | 'bottom-bun' | 'patty' | 'cheese' | 'lettuce' | 'tomato'
  | 'fries' | 'ketchup' | 'salt'
  | 'cup' | 'ice-cream' | 'milk';

export type IngredientCategory = 'burger' | 'fries' | 'shake';

export interface Ingredient {
  id: IngredientType;
  name: string;
  category: IngredientCategory;
  emoji: string;
}

// Player types
export interface Player {
  id: string;
  name: string;
  tokens: number;
  ingredients: IngredientType[];
}

// Game state types
export type GameScreen =
  | 'title'
  | 'mode-select'
  | 'player-setup'
  | 'ingredient-select'
  | 'wager'
  | 'playing'
  | 'round-result'
  | 'pass-device'
  | 'game-over'
  | 'victory';

export type GameMode = 'single' | 'multiplayer';

export type RoundResult = 'win' | 'lose' | 'blackjack' | 'push' | 'bust';

export interface GameState {
  screen: GameScreen;
  mode: GameMode;
  players: Player[];
  currentPlayerIndex: number;

  // Current round state
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  currentWager: number;
  targetIngredient: IngredientType | null;
  roundResult: RoundResult | null;

  // Game settings
  startingTokens: number;
}

// All ingredients data
export const INGREDIENTS: Ingredient[] = [
  // Burger
  { id: 'top-bun', name: 'Top Bun', category: 'burger', emoji: '🍞' },
  { id: 'bottom-bun', name: 'Bottom Bun', category: 'burger', emoji: '🍞' },
  { id: 'patty', name: 'Patty', category: 'burger', emoji: '🥩' },
  { id: 'cheese', name: 'Cheese', category: 'burger', emoji: '🧀' },
  { id: 'lettuce', name: 'Lettuce', category: 'burger', emoji: '🥬' },
  { id: 'tomato', name: 'Tomato', category: 'burger', emoji: '🍅' },
  // Fries
  { id: 'fries', name: 'Fries', category: 'fries', emoji: '🍟' },
  { id: 'ketchup', name: 'Ketchup', category: 'fries', emoji: '🥫' },
  { id: 'salt', name: 'Salt', category: 'fries', emoji: '🧂' },
  // Shake
  { id: 'cup', name: 'Cup', category: 'shake', emoji: '🥤' },
  { id: 'ice-cream', name: 'Ice Cream', category: 'shake', emoji: '🍦' },
  { id: 'milk', name: 'Milk', category: 'shake', emoji: '🥛' },
];

export const TOTAL_INGREDIENTS = INGREDIENTS.length;
