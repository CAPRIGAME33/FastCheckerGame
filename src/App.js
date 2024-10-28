import './App.css';
import ArticlesReview from './components/ArticlesReview';
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import TeamSetup from './components/TeamSetup';
import Instructions from './components/Instructions';
import GameBoard from './components/GameBoard';
import Results from './components/Results';
import { articles, events } from './data/articles';

function App() {
  const [gameStep, setGameStep] = useState('home');
  const [showingReview, setShowingReview] = useState(false);
  const [teams, setTeams] = useState([]);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [firstRoundChoices, setFirstRoundChoices] = useState({});
  const [secondRoundChoices, setSecondRoundChoices] = useState({});

  const handleStartGame = () => setGameStep('setup');
  const handleTeamsConfigured = (teamNames) => {
    setTeams(teamNames);
    setGameStep('instructions');
  };
  const handleRoundStart = () => setGameStep('gameboard');
  const handleRoundEnd = (roundScore, articlesToVerify, choices) => {
    setScore(prevScore => prevScore + roundScore);
    setFilteredArticles(articlesToVerify);
    if (currentRound === 1) {
      setFirstRoundChoices(choices);
    } else {
      setSecondRoundChoices(choices);
    }
    setGameStep('results');
  };
  const handleNextRound = () => {
    setCurrentRound(2);
    setGameStep('instructions');
  };
  const handleReviewArticles = () => {
    setShowingReview(true);
    setGameStep('review');
  };
  
  const handleProceedAfterReview = () => {
    setShowingReview(false);
    setCurrentRound(2);
    setGameStep('instructions');
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    {gameStep === 'home' && <HomePage onStartGame={handleStartGame} />}
    {gameStep === 'setup' && <TeamSetup onTeamsConfigured={handleTeamsConfigured} />}
    {gameStep === 'instructions' && (
      <Instructions
        currentRound={currentRound}
        onProceed={handleRoundStart}
      />
    )}
    {gameStep === 'gameboard' && (
  <GameBoard
    teams={teams}
    articles={currentRound === 1 ? articles.slice(0, 20) : [...filteredArticles, ...articles.slice(20, 40)]}
    onRoundEnd={handleRoundEnd}
    currentRound={currentRound}
  />
)}
    {gameStep === 'results' && (
      <Results
        score={score}
        onNextRound={currentRound === 1 ? handleNextRound : null}
        onReviewArticles={handleReviewArticles}
      />
    )}
    {gameStep === 'review' && (
  <ArticlesReview
    articles={currentRound === 1 ? articles.slice(0, 10) : [...filteredArticles, ...articles.slice(10, 15)]}
    choices={currentRound === 1 ? firstRoundChoices : secondRoundChoices}
    onProceedToNextRound={currentRound === 1 ? handleProceedAfterReview : () => window.location.reload()}
  />
)}
  </div>
);
}

export default App;
