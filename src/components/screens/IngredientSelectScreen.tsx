import type { Player, IngredientType, IngredientCategory } from '../../types';
import { INGREDIENTS } from '../../types';
import './Screens.css';

interface IngredientSelectScreenProps {
  player: Player;
  onSelect: (ingredient: IngredientType) => void;
}

export function IngredientSelectScreen({ player, onSelect }: IngredientSelectScreenProps) {
  const categories: IngredientCategory[] = ['burger', 'fries', 'shake'];
  const categoryEmoji: Record<IngredientCategory, string> = {
    burger: '🍔',
    fries: '🍟',
    shake: '🥤',
  };

  return (
    <div className="screen ingredient-screen">
      <div className="player-header">
        <span className="player-name">{player.name}</span>
        <span className="token-count">🪙 {player.tokens}</span>
      </div>

      <h2>Choose Your Prize</h2>
      <p className="ingredient-hint">Win this ingredient if you beat the dealer!</p>

      <div className="ingredient-categories">
        {categories.map((cat) => {
          const ownedCount = INGREDIENTS.filter(
            (i) => i.category === cat && player.ingredients.includes(i.id)
          ).length;
          const totalCount = INGREDIENTS.filter((i) => i.category === cat).length;

          return (
            <div key={cat} className="ingredient-category">
              <h3>
                {categoryEmoji[cat]} {cat} ({ownedCount}/{totalCount})
              </h3>
              <div className="ingredient-grid">
                {INGREDIENTS.filter((i) => i.category === cat).map((ing) => {
                  const owned = player.ingredients.includes(ing.id);
                  return (
                    <button
                      key={ing.id}
                      className={`ingredient-btn ${owned ? 'owned' : ''}`}
                      onClick={() => !owned && onSelect(ing.id)}
                      disabled={owned}
                    >
                      <span className="ingredient-emoji">{ing.emoji}</span>
                      <span className="ingredient-name">{ing.name}</span>
                      {owned && <span className="owned-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
