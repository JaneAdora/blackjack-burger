import type { Card as CardType } from '../types';
import './Card.css';

interface CardProps {
  card: CardType;
  small?: boolean;
}

const SUIT_SYMBOLS: Record<string, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const SUIT_COLORS: Record<string, string> = {
  hearts: 'red',
  diamonds: 'red',
  clubs: 'black',
  spades: 'black',
};

export function Card({ card, small }: CardProps) {
  if (!card.faceUp) {
    return <div className={`card card-back ${small ? 'card-small' : ''}`}>?</div>;
  }

  const symbol = SUIT_SYMBOLS[card.suit];
  const color = SUIT_COLORS[card.suit];

  return (
    <div className={`card card-front ${small ? 'card-small' : ''}`} data-color={color}>
      <span className="card-rank">{card.rank}</span>
      <span className="card-suit">{symbol}</span>
    </div>
  );
}
