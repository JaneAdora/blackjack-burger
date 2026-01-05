import { Button } from '../Button';
import type { Player } from '../../types';
import './Screens.css';

interface GameOverScreenProps {
  player: Player;
  onRestart: () => void;
}

export function GameOverScreen({ player, onRestart }: GameOverScreenProps) {
  return (
    <div className="screen gameover-screen">
      <div className="gameover-content">
        <span className="gameover-emoji">😵</span>
        <h2>GAME OVER</h2>
        <p>{player.name} ran out of tokens!</p>
        <div className="final-stats">
          <p>Ingredients collected: {player.ingredients.length}/12</p>
        </div>
      </div>
      <Button size="large" onClick={onRestart}>
        Try Again
      </Button>
    </div>
  );
}
