import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { events, articles as allArticles } from '../data/articles';

// Charger le son de montre mécanique
const tickSound = new Audio('/sounds/tick.mp3');
tickSound.loop = true; // Permet de jouer le son en boucle

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function GameBoard({ teams, articles, onRoundEnd, currentRound }) {
  const [selectedChoices, setSelectedChoices] = useState({});
  const [timer, setTimer] = useState(currentRound === 1 ? 240 : 240); // 4 minutes pour la première manche, 4 pour la deuxième
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSecondRoundInstructions, setShowSecondRoundInstructions] = useState(false);
  const [score, setScore] = useState(0);
  const [fastChecking, setFastChecking] = useState(null);
  const [fastCheckTimer, setFastCheckTimer] = useState(30);
  const [fastCheckedCards, setFastCheckedCards] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [pendingEvent, setPendingEvent] = useState(false);
  const [firstEventTriggered, setFirstEventTriggered] = useState(false);
  const [roundArticles, setRoundArticles] = useState([]);
  const [verifyArticles, setVerifyArticles] = useState([]); // Articles "à vérifier" de la première manche

  // Initialiser les articles en fonction de la manche
  useEffect(() => {
    if (currentRound === 1) {
      setRoundArticles(shuffleArray(articles).slice(0, 20));
    } else if (currentRound === 2) {
      const additionalArticles = shuffleArray(allArticles)
        .filter(article => !verifyArticles.some(a => a.id === article.id))
        .slice(0, 20 - verifyArticles.length);
      setRoundArticles([...verifyArticles, ...additionalArticles]);
    }
  }, [currentRound, articles, verifyArticles]);

  // Jouer le son de montre mécanique en continu au début de la première manche
  useEffect(() => {
    if (currentRound === 1 && !isRoundEnded) {
      tickSound.play();
    }

    // Nettoyage pour arrêter le son à la fin de la manche
    return () => {
      tickSound.pause();
      tickSound.currentTime = 0; // Remettre le son à zéro quand la manche est terminée
    };
  }, [currentRound, isRoundEnded]);

  // Timer principal de la manche
  useEffect(() => {
    if (!isRoundEnded && timer > 0 && !confirmationPrompt) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 || isRoundEnded) {
      handleRoundEnd();
    }
  }, [timer, isRoundEnded, confirmationPrompt]);

  // Timer du Fast Checking de 30 secondes
  useEffect(() => {
    if (fastChecking !== null && fastCheckTimer > 0) {
      const countdown = setInterval(() => setFastCheckTimer(prev => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (fastCheckTimer === 0 && fastChecking !== null) {
      completeFastCheck();
    }
  }, [fastCheckTimer, fastChecking]);

  // Timer pour les événements spéciaux
  useEffect(() => {
    if (currentRound === 2) {
      if (timer === 195 && !firstEventTriggered) {
        if (!fastChecking) {
          triggerRandomEvent();
          setFirstEventTriggered(true);
        } else {
          setPendingEvent(true);
        }
      } else if (timer % 60 === 0 && timer < 195 && timer > 0) {
        if (!fastChecking) {
          triggerRandomEvent();
        } else {
          setPendingEvent(true);
        }
      } else if (pendingEvent && !fastChecking && !currentEvent) {
        const timer = setTimeout(() => {
          triggerRandomEvent();
          setPendingEvent(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentRound, timer, fastChecking, pendingEvent, currentEvent, firstEventTriggered]);

  const triggerRandomEvent = () => {
    if (currentRound === 2 && !fastChecking) {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setCurrentEvent(randomEvent);
    }
  };

  const handleChoiceSelection = (articleId, choice) => {
    setSelectedChoices(prevChoices => ({
      ...prevChoices,
      [articleId]: choice
    }));
  };

  const handleRoundEnd = () => {
    setIsRoundEnded(true);
    tickSound.pause(); // Arrête le son de montre
    if (timer > 0) {
      setConfirmationPrompt(true);
    } else {
      handlePublishConfirmed();
    }
  };

  const handlePublishConfirmed = () => {
    setConfirmationPrompt(false);
    calculateScore();
    setShowScores(true);
  };

  const calculateScore = () => {
    let roundScore = 0;
    const newHistory = [];

    roundArticles.forEach(article => {
      const choice = selectedChoices[article.id];
      let points = 0;

      if (choice === 'vrai') {
        points = article.isTrue ? 1000 : -2000;
      } else if (choice === 'faux') {
        points = article.isTrue ? -1000 : 500;
      } else if (choice === 'verifier') {
        points = 0;
        if (currentRound === 1) {
          setVerifyArticles(prev => [...prev, article]);
        }
      } else if (fastCheckedCards.has(article.id)) {
        points = article.isTrue ? 500 : 250;
      }

      roundScore += points;

      newHistory.push({
        title: article.title,
        choice: choice || (fastCheckedCards.has(article.id) ? "Fast Checking" : "Non traité"),
        points: points
      });
    });

    setScore(roundScore);
    setHistory(newHistory);
    setShowHistory(true);
    onRoundEnd(roundScore, roundArticles, selectedChoices);
  };

  const proceedToNextStage = () => {
    if (currentRound === 1) {
      setShowSecondRoundInstructions(true);
    } else {
      alert("Fin du jeu !");
    }
  };

  const proceedToSecondRound = () => {
    setShowSecondRoundInstructions(false);
    setIsRoundEnded(false);
    setTimer(240);
  };

  const startFastChecking = (articleId) => {
    setFastChecking(articleId);
    setFastCheckTimer(30);
  };

  const completeFastCheck = () => {
    if (fastChecking !== null) {
      const article = roundArticles.find(a => a.id === fastChecking);
      const correctAnswer = article.isTrue ? 'vrai' : 'faux';
      setSelectedChoices(prevChoices => ({
        ...prevChoices,
        [fastChecking]: correctAnswer
      }));
      setFastCheckedCards(prev => new Set(prev).add(fastChecking));
    }
    setFastChecking(null);
    setFastCheckTimer(30);
  };

  return (
    <div className="p-6 space-y-6 relative game-board-background">
          <button
      onClick={() => window.location.reload()}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-sm z-50"
    >
      Home
    </button>
{currentEvent && currentRound === 2 && (
  <div className="message-overlay">
    <EventCard 
      event={currentEvent} 
      onClose={() => setCurrentEvent(null)} 
    />
  </div>
)}

{confirmationPrompt && (
  <div className="message-overlay">
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <p className="text-lg font-semibold mb-4">
        Les articles que vous avez choisi vont partir à l'impression. Êtes-vous sûr-e-s de vos choix ?
      </p>
      <div className="flex justify-around mt-4">
        <button
          onClick={handlePublishConfirmed}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Oui, publier !
        </button>
        <button
          onClick={() => {
            setConfirmationPrompt(false);
            setIsRoundEnded(false);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Non, je veux revoir mes cartes
        </button>
      </div>
    </div>
  </div>
)}

{fastChecking && (
  <div className="message-overlay">
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <p className="text-lg font-semibold mb-4 text-blue-700">Fast Checking en cours...</p>
      <p className="text-2xl font-bold">{fastCheckTimer} secondes restantes</p>
    </div>
  </div>
)}


{showScores && !showHistory ? (
  <>
    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
      Résultats de la Manche
    </h2>
    <p className="text-center text-lg text-gray-800 mb-6">Score total : {score} points</p>
    <button
      onClick={() => setShowHistory(true)}
      className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
    >
      Voir l'historique des réponses
    </button>
  </>
) : showHistory ? (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center">
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Historique des Réponses</h2>
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {history.map((entry, index) => (
        <div key={index} className="bg-gray-100 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
          <p className="text-gray-700">Choix : {entry.choice}</p>
          <p className="text-gray-700">Points : {entry.points}</p>
        </div>
      ))}
    </div>
    <button
      onClick={proceedToNextStage}
      className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
    >
      {currentRound === 1 ? 'Passer à la deuxième manche' : 'Terminer le jeu'}
    </button>
  </div>
) : showSecondRoundInstructions ? (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center">
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Deuxième Manche</h2>
    <p className="text-gray-700 mb-4">
      Félicitations pour avoir terminé la première manche ! Le rédacteur en chef vous accorde une seconde chance pour évaluer
      certains articles marqués "À vérifier" et de nouveaux articles venant de nos correspondants à l'étranger.
    </p>
    <p className="text-gray-700 mb-4">
      Cette fois, vous pouvez utiliser le <strong>Fast Checking</strong> pour obtenir de l'aide en échange d'un délai de 30 secondes,
      pendant lequel le jeu sera temporairement bloqué.
    </p>
    <p className="text-gray-700 mb-6">
      Attention, des événements inattendus peuvent survenir et affecter vos décisions. Bonne chance !
    </p>
    <button
      onClick={proceedToSecondRound}
      className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600"
    >
      C'est parti !
    </button>
  </div>
) : (
  <>
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            {currentRound === 1 ? 'Première Manche' : 'Deuxième Manche'}
          </h2>
          <p className={`text-center ${timer <= 10 ? 'timer-critical' : 'text-white'}`}>
  Temps restant : {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
</p>


          <div className="max-h-[70vh] overflow-y-auto px-4">
            <div className="grid grid-cols-4 gap-4">
            {roundArticles.map(article => (
  <div key={article.id} className={`p-3 text-center border rounded-lg shadow-lg text-sm article-card ${
    fastCheckedCards.has(article.id) ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200'
  }`}>
    <h3 className="text-lg font-bold article-title mb-2">{article.title}</h3>
    <p className="text-sm text-gray-600">Catégorie: {article.category}</p>

    {!isRoundEnded && (
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleChoiceSelection(article.id, 'vrai')}
            className={`flex-1 py-1 px-2 rounded text-sm ${selectedChoices[article.id] === 'vrai' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Vrai
          </button>
          <button
            onClick={() => handleChoiceSelection(article.id, 'faux')}
            className={`flex-1 py-1 px-2 rounded text-sm ${selectedChoices[article.id] === 'faux' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Faux
          </button>
        </div>
        <button
          onClick={() => currentRound === 1 
            ? handleChoiceSelection(article.id, 'verifier')
            : startFastChecking(article.id)
          }
          className={`w-full py-1 px-2 rounded text-sm ${
            currentRound === 1 
              ? selectedChoices[article.id] === 'verifier' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
              : fastChecking === article.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          disabled={currentRound === 2 && fastChecking !== null}
        >
          {currentRound === 1 ? 'À vérifier' : 'Fast Checking'}
        </button>
      </div>
    )}
  </div>
))}

            </div>
          </div>

          {!isRoundEnded && (
            <button
              onClick={() => setIsRoundEnded(true)}
              className="w-full mt-6 bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Terminé !
            </button>
          )}

          {fastChecking && (
            <div className="message-overlay">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-lg font-semibold mb-4 text-blue-700">Fast Checking en cours...</p>
                <p className="text-2xl font-bold">{fastCheckTimer} secondes restantes</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GameBoard;
