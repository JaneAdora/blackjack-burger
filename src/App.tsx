import { useGame } from './hooks/useGame';
import {
  TitleScreen,
  ModeSelectScreen,
  PlayerSetupScreen,
  IngredientSelectScreen,
  PlayingScreen,
  RoundResultScreen,
  PassDeviceScreen,
  GameOverScreen,
  VictoryScreen,
} from './components/screens';
import './App.css';

function App() {
  const { state, currentPlayer, actions } = useGame();

  const renderScreen = () => {
    switch (state.screen) {
      case 'title':
        return <TitleScreen onStart={actions.goToModeSelect} />;

      case 'mode-select':
        return (
          <ModeSelectScreen
            onSelect={actions.selectMode}
            onBack={actions.goToTitle}
          />
        );

      case 'player-setup':
        return (
          <PlayerSetupScreen
            mode={state.mode}
            onStart={actions.startGame}
            onBack={actions.goToModeSelect}
          />
        );

      case 'ingredient-select':
        return (
          <IngredientSelectScreen
            player={currentPlayer}
            onSelect={actions.selectIngredient}
          />
        );

      case 'playing':
        return (
          <PlayingScreen
            player={currentPlayer}
            playerHand={state.playerHand}
            dealerHand={state.dealerHand}
            targetIngredient={state.targetIngredient!}
            onHit={actions.hit}
            onStand={actions.stand}
          />
        );

      case 'round-result':
        return (
          <RoundResultScreen
            player={currentPlayer}
            playerHand={state.playerHand}
            dealerHand={state.dealerHand}
            targetIngredient={state.targetIngredient!}
            result={state.roundResult!}
            onContinue={actions.processResult}
          />
        );

      case 'pass-device':
        return (
          <PassDeviceScreen
            nextPlayer={currentPlayer}
            onContinue={actions.continueAfterPass}
          />
        );

      case 'game-over':
        return (
          <GameOverScreen
            player={currentPlayer}
            onRestart={actions.restartGame}
          />
        );

      case 'victory':
        return (
          <VictoryScreen
            player={currentPlayer}
            onRestart={actions.restartGame}
          />
        );

      default:
        return <TitleScreen onStart={actions.goToModeSelect} />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;
