import { Button } from '../Button';
import type { Player, IngredientType } from '../../types';
import { INGREDIENTS } from '../../types';
import './Screens.css';

interface WagerScreenProps {
  player: Player;
  targetIngredient: IngredientType;
  wager: number;
  onWagerChange: (amount: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export function WagerScreen({
  player,
  targetIngredient,
  wager,
  onWagerChange,
  onConfirm,
  onBack,
}: WagerScreenProps) {
  const ingredient = INGREDIENTS.find((i) => i.id === targetIngredient)!;
  const maxWager = Math.min(player.tokens, 5);

  return (
    <div className="screen wager-screen">
      <div className="player-header">
        <span className="player-name">{player.name}</span>
        <span className="token-count">🪙 {player.tokens}</span>
      </div>

      <div className="wager-prize">
        <p>Playing for:</p>
        <div className="prize-display">
          <span className="prize-emoji">{ingredient.emoji}</span>
          <span className="prize-name">{ingredient.name}</span>
        </div>
      </div>

      <div className="wager-control">
        <p>Place your wager:</p>
        <div className="wager-buttons">
          <button
            className="wager-adjust"
            onClick={() => onWagerChange(wager - 1)}
            disabled={wager <= 1}
          >
            -
          </button>
          <span className="wager-amount">🪙 {wager}</span>
          <button
            className="wager-adjust"
            onClick={() => onWagerChange(wager + 1)}
            disabled={wager >= maxWager}
          >
            +
          </button>
        </div>
        <p className="wager-hint">
          Win: Get ingredient + keep tokens
          <br />
          Blackjack: +{wager} bonus tokens!
          <br />
          Lose: -{wager} tokens
        </p>
      </div>

      <div className="wager-actions">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm}>Deal!</Button>
      </div>
    </div>
  );
}
