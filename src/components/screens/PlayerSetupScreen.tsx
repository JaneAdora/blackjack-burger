import { useState } from 'react';
import { Button } from '../Button';
import type { GameMode } from '../../types';
import './Screens.css';

interface PlayerSetupScreenProps {
  mode: GameMode;
  onStart: (names: string[]) => void;
  onBack: () => void;
}

export function PlayerSetupScreen({ mode, onStart, onBack }: PlayerSetupScreenProps) {
  const [names, setNames] = useState<string[]>(
    mode === 'single' ? ['Player 1'] : ['Player 1', 'Player 2']
  );

  const updateName = (index: number, name: string) => {
    const newNames = [...names];
    newNames[index] = name;
    setNames(newNames);
  };

  const addPlayer = () => {
    if (names.length < 4) {
      setNames([...names, `Player ${names.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (names.length > 2) {
      setNames(names.filter((_, i) => i !== index));
    }
  };

  const canStart = names.every((n) => n.trim().length > 0);

  return (
    <div className="screen setup-screen">
      <h2>{mode === 'single' ? 'Enter Your Name' : 'Enter Player Names'}</h2>

      <div className="player-inputs">
        {names.map((name, i) => (
          <div key={i} className="player-input-row">
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`Player ${i + 1}`}
              maxLength={12}
              className="pixel-input"
            />
            {mode === 'multiplayer' && names.length > 2 && (
              <button className="remove-btn" onClick={() => removePlayer(i)}>
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {mode === 'multiplayer' && names.length < 4 && (
        <Button variant="secondary" size="small" onClick={addPlayer}>
          + Add Player
        </Button>
      )}

      <div className="setup-buttons">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onStart(names)} disabled={!canStart}>
          Play!
        </Button>
      </div>
    </div>
  );
}
