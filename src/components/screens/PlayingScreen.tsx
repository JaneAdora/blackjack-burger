import { Button } from '../Button';
import { Card } from '../Card';
import type { Card as CardType, Player, IngredientType } from '../../types';
import { INGREDIENTS } from '../../types';
import { calculateHandValue } from '../../utils/deck';
import './Screens.css';

interface PlayingScreenProps {
  player: Player;
  playerHand: CardType[];
  dealerHand: CardType[];
  targetIngredient: IngredientType;
  onHit: () => void;
  onStand: () => void;
}

export function PlayingScreen({
  player,
  playerHand,
  dealerHand,
  targetIngredient,
  onHit,
  onStand,
}: PlayingScreenProps) {
  const ingredient = INGREDIENTS.find((i) => i.id === targetIngredient)!;
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  return (
    <div className="screen playing-screen">
      <div className="game-header">
        <span className="player-name">{player.name}</span>
        <span className="wager-info">
          Playing for {ingredient.emoji}
        </span>
      </div>

      <div className="hands-container">
        <div className="hand dealer-hand">
          <h3>Dealer {dealerHand.every((c) => c.faceUp) && `(${dealerValue})`}</h3>
          <div className="cards">
            {dealerHand.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>

        <div className="hand player-hand">
          <h3>
            You ({playerValue})
            {playerValue === 21 && playerHand.length === 2 && ' BLACKJACK!'}
          </h3>
          <div className="cards">
            {playerHand.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <Button onClick={onHit} disabled={playerValue >= 21}>
          Hit
        </Button>
        <Button variant="secondary" onClick={onStand}>
          Stand
        </Button>
      </div>
    </div>
  );
}
