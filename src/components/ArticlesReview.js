import React from 'react';

function ArticlesReview({ articles, choices, onProceedToNextRound }) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Revue des Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => {
          const choice = choices[article.id];
          const isToVerify = choice === 'verifier';
          const isCorrect = 
            (choice === 'vrai' && article.isTrue) || 
            (choice === 'faux' && !article.isTrue);
          
          let points = 0;
          if (choice === 'vrai') {
            points = article.isTrue ? 1000 : -2000;
          } else if (choice === 'faux') {
            points = article.isTrue ? -1000 : 500;
          }

          return (
            <div 
              key={article.id} 
              className={`p-4 rounded-lg shadow-lg ${
                isToVerify ? 'bg-orange-100 border-orange-500' :
                isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
              } border-l-4`}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {article.title}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Catégorie: {article.category}
                </p>
                <p className="text-sm font-medium">
                  Votre réponse : {choice}
                </p>
                {!isToVerify && (
                  <>
                    <p className="text-sm font-medium">
                      Réponse correcte : {article.isTrue ? 'vrai' : 'faux'}
                    </p>
                    <p className={`text-sm font-bold ${points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Points : {points > 0 ? '+' : ''}{points}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onProceedToNextRound}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600"
        >
          Passer à la manche suivante
        </button>
      </div>
    </div>
  );
}

export default ArticlesReview;