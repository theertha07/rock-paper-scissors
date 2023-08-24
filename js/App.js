import React, { useState } from 'react';
import AuthenticationForm from '../../AuthenticationForm';
import GameLobby from '../../GameLobby';
import Gameplay from '../../Gameplay';
import Leaderboard from './Leaderboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handlePlay = (player) => {
    setGameStarted(true);
  };

  const handleChoiceSelect = (choice) => {
    setPlayerChoice(choice);
    // Simulate opponent's choice randomly (rock, paper, or scissors)
    const choices = ['rock', 'paper', 'scissors'];
    const opponentChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Determine the game result
    if (choice === opponentChoice) {
      setResult('Draw');
    } else if (
      (choice === 'rock' && opponentChoice === 'scissors') ||
      (choice === 'paper' && opponentChoice === 'rock') ||
      (choice === 'scissors' && opponentChoice === 'paper')
    ) {
      setResult('Win');
      setPlayerScore(playerScore + 1);
    } else {
      setResult('Lose');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          {gameStarted ? (
            <Gameplay
              onChoiceSelect={handleChoiceSelect}
            />
          ) : (
            <GameLobby
              players={players}
              onPlay={handlePlay}
            />
          )}
          <Leaderboard players={players} />
          <p>Your choice: {playerChoice}</p>
          <p>Result: {result}</p>
          <p>Your score: {playerScore}</p>
        </div>
      ) : (
        <AuthenticationForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
