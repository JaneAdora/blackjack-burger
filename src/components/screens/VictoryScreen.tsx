import { Button } from '../Button';
import type { Player } from '../../types';
import { INGREDIENTS } from '../../types';
import './Screens.css';

interface VictoryScreenProps {
  player: Player;
  onRestart: () => void;
}

export function VictoryScreen({ player, onRestart }: VictoryScreenProps) {
  return (
    <div className="screen victory-screen">
      <div className="victory-content">
        <div className="victory-meal">
          <span>🍔</span>
          <span>🍟</span>
          <span>🥤</span>
        </div>
        <h2>YOU WIN!</h2>
        <p className="winner-name">{player.name} built the meal!</p>
        <div className="victory-ingredients">
          {INGREDIENTS.map((ing) => (
            <span key={ing.id} className="victory-ingredient">
              {ing.emoji}
            </span>
          ))}
        </div>
        <p className="final-tokens">Final tokens: 🪙 {player.tokens}</p>
      </div>
      <Button size="large" onClick={onRestart}>
        Play Again
      </Button>
    </div>
  );
}
