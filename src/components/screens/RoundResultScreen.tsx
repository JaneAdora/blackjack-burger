import { Button } from '../Button';
import { Card } from '../Card';
import type {
  Card as CardType,
  Player,
  IngredientType,
  RoundResult,
} from '../../types';
import { INGREDIENTS } from '../../types';
import { calculateHandValue } from '../../utils/deck';
import './Screens.css';

interface RoundResultScreenProps {
  player: Player;
  playerHand: CardType[];
  dealerHand: CardType[];
  targetIngredient: IngredientType;
  result: RoundResult;
  onContinue: () => void;
}

const RESULT_MESSAGES: Record<RoundResult, { title: string; emoji: string }> = {
  blackjack: { title: 'BLACKJACK!', emoji: '🎰' },
  win: { title: 'YOU WIN!', emoji: '🎉' },
  lose: { title: 'YOU LOSE', emoji: '😢' },
  bust: { title: 'BUST!', emoji: '💥' },
  push: { title: 'PUSH', emoji: '🤝' },
};

export function RoundResultScreen({
  player,
  playerHand,
  dealerHand,
  targetIngredient,
  result,
  onContinue,
}: RoundResultScreenProps) {
  const ingredient = INGREDIENTS.find((i) => i.id === targetIngredient)!;
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  const message = RESULT_MESSAGES[result];

  const isWin = result === 'win' || result === 'blackjack';

  return (
    <div className="screen result-screen">
      <div className={`result-banner ${isWin ? 'win' : result === 'push' ? 'push' : 'lose'}`}>
        <span className="result-emoji">{message.emoji}</span>
        <h2>{message.title}</h2>
      </div>

      <div className="result-hands">
        <div className="result-hand">
          <span>Dealer: {dealerValue}</span>
          <div className="cards cards-small">
            {dealerHand.map((card, i) => (
              <Card key={i} card={{ ...card, faceUp: true }} small />
            ))}
          </div>
        </div>
        <div className="result-hand">
          <span>You: {playerValue}</span>
          <div className="cards cards-small">
            {playerHand.map((card, i) => (
              <Card key={i} card={card} small />
            ))}
          </div>
        </div>
      </div>

      <div className="result-outcome">
        {result === 'blackjack' && (
          <p>
            Won {ingredient.emoji} {ingredient.name} + 🪙 1 bonus!
          </p>
        )}
        {result === 'win' && (
          <p>
            Won {ingredient.emoji} {ingredient.name}!
          </p>
        )}
        {result === 'lose' && <p>Lost 🪙 1 token</p>}
        {result === 'bust' && <p>Lost 🪙 1 token</p>}
        {result === 'push' && <p>No change - try again!</p>}
      </div>

      <p className="tokens-remaining">Tokens: 🪙 {player.tokens}</p>

      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
