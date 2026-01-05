import { Button } from '../Button';
import type { Player } from '../../types';
import './Screens.css';

interface PassDeviceScreenProps {
  nextPlayer: Player;
  onContinue: () => void;
}

export function PassDeviceScreen({ nextPlayer, onContinue }: PassDeviceScreenProps) {
  return (
    <div className="screen pass-screen">
      <div className="pass-content">
        <span className="pass-emoji">📱</span>
        <h2>Pass the device to</h2>
        <p className="next-player-name">{nextPlayer.name}</p>
        <div className="pass-stats">
          <span>🪙 {nextPlayer.tokens} tokens</span>
          <span>🎯 {nextPlayer.ingredients.length}/12 ingredients</span>
        </div>
      </div>
      <Button size="large" onClick={onContinue}>
        I'm {nextPlayer.name}!
      </Button>
    </div>
  );
}
