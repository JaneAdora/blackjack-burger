import { Button } from '../Button';
import './Screens.css';

interface TitleScreenProps {
  onStart: () => void;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="screen title-screen">
      <div className="title-logo">
        <span className="title-emoji">🍔</span>
        <h1>Blackjack Burger</h1>
        <span className="title-emoji">🃏</span>
      </div>
      <p className="title-subtitle">Bet tokens. Win ingredients. Build the meal!</p>
      <div className="title-meal">
        <span>🍔</span>
        <span>🍟</span>
        <span>🥤</span>
      </div>
      <Button size="large" onClick={onStart}>
        Start Game
      </Button>
    </div>
  );
}
