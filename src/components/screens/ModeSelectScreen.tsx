import { Button } from '../Button';
import type { GameMode } from '../../types';
import './Screens.css';

interface ModeSelectScreenProps {
  onSelect: (mode: GameMode) => void;
  onBack: () => void;
}

export function ModeSelectScreen({ onSelect, onBack }: ModeSelectScreenProps) {
  return (
    <div className="screen mode-screen">
      <h2>Select Mode</h2>
      <div className="mode-options">
        <button className="mode-card" onClick={() => onSelect('single')}>
          <span className="mode-icon">👤</span>
          <span className="mode-title">Single Player</span>
          <span className="mode-desc">Play solo!</span>
        </button>
        <button className="mode-card" onClick={() => onSelect('multiplayer')}>
          <span className="mode-icon">👥</span>
          <span className="mode-title">Multiplayer</span>
          <span className="mode-desc">Pass & Play</span>
        </button>
      </div>
      <Button variant="secondary" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}
