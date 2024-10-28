import React from 'react';

function Results({ score, onNextRound, onReviewArticles, currentRound }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Résultats de la Manche {currentRound}</h2>
      <p className="text-xl text-gray-800 mb-6">Score total : {score} points</p>
      
      <button
        onClick={onReviewArticles}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 mb-4"
      >
        Revoir les articles
      </button>

      {currentRound === 1 && (
        <button
          onClick={onNextRound}
          className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600"
        >
          Passer à la manche suivante
        </button>
      )}

      {currentRound === 2 && (
        <div>
          <h3 className="text-lg font-bold text-gray-700 mt-4">Jeu terminé !</h3>
          <p className="text-md text-gray-600 mb-6">Félicitations pour avoir terminé le Fast Checker Game !</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600"
          >
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
}

export default Results;