import React from 'react';

function HomePage({ onStartGame }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Fast Checker Game</h1>
      <p className="text-center text-lg text-gray-700 mb-6 max-w-md">
        Bienvenue dans le <strong>Fast Checker Game</strong> ! Dans ce jeu, chaque équipe incarne une rédaction de journalistes
        qui doit évaluer et publier des articles d’actualité tout en veillant à ne pas diffuser de fausses informations.
        Votre objectif est de maximiser le score en publiant des articles fiables et pertinents pour attirer des lecteurs.
      </p>
      <p className="text-center text-lg text-gray-700 mb-8 max-w-md">
        Mais attention : chaque erreur risque de nuire à la réputation de votre média ! Soyez vigilants et prenez des décisions rapides.
        Préparez-vous à affronter deux manches pleines de rebondissements. 
      </p>
      <button
        onClick={onStartGame}
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-600"
      >
        Lancer le jeu
      </button>
    </div>
  );
}

export default HomePage;
