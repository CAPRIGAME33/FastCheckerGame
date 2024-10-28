import React from 'react';

function Instructions({ currentRound, onProceed }) {
  const instructions = currentRound === 1 
    ? (
      <>
        <p className="text-gray-700 mb-4">
          <strong>Manche 1 :</strong> En tant que membres d'une rédaction, votre mission est d'évaluer une série d'articles 
          pour déterminer ceux qui méritent d'être publiés. L'objectif est d'obtenir un maximum de vues en publiant des informations fiables. 
          Vous aurez un temps limité pour examiner 10 articles.
        </p>
        <p className="text-gray-700 mb-6">
          Pour chaque article, vous devrez choisir s'il est "Vrai" et publiable, "Faux" et à bannir, ou s'il nécessite une vérification supplémentaire. 
          Votre score dépendra de la précision de vos décisions : attention, publier une fausse information peut gravement nuire à votre réputation !
          Vous avez 4 minutes pour réaliser ce travail. Vous perdez des points si vous ne finissez pas à temps!
        </p>
      </>
    )
    : (
      <>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Deuxième Manche</h2>
        <p className="text-gray-700 mb-4">
          Vous avez fait quelques erreurs, et certains de vos articles sont restés en attente de vérification. Mais le rédacteur en chef vous accorde une seconde chance pour évaluer
          ces articles restants. Il vous annonce également que de nouveaux articles rédigés par vos correspondants à l'étranger viennent d'arriver et vous devrez décider lesquels sont publiables ou non.
        </p>
        <p className="text-gray-700 mb-4">
          Cette fois, le rédacteur en chef propose son aide. Si vous avez un doute sur un ou plusieurs articles, vous pouvez faire appel à lui pour qu'il procède à un <strong>Fast Checking</strong> des informations. Ainsi, vous saurez si votre article est publiable ou s'il s'agit d'une fake news et vous gagnerez des points. Mais attention, chaque fast checking prend 30 secondes, délai 
          pendant lequel votre jeu sera temporairement bloqué.
        </p>
        <p className="text-gray-700 mb-6">
          C'est la dernière ligne droite! La pression monte dans la rédaction et des événements inattendus peuvent survenir. Bonne chance !
        </p>
      </>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Instructions de la Manche</h2>
      {instructions}
      <button
        onClick={onProceed}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        J'ai compris
      </button>
    </div>
  );
}

export default Instructions;
