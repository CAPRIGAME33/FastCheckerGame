import React, { useState } from 'react';

function TeamSetup({ onTeamsConfigured }) {
  const [teamNames, setTeamNames] = useState(['Équipe 1', 'Équipe 2']);
  
  const addTeam = () => {
    if (teamNames.length < 5) {
      setTeamNames([...teamNames, `Équipe ${teamNames.length + 1}`]);
    }
  };

  const handleNameChange = (index, name) => {
    const updatedNames = [...teamNames];
    updatedNames[index] = name;
    setTeamNames(updatedNames);
  };

  const handleSubmit = () => onTeamsConfigured(teamNames);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Configuration des équipes</h2>
      <p className="text-gray-700 mb-6">
        Chaque équipe représente une rédaction de média prête à analyser et publier des articles. Donnez un nom à chaque équipe pour symboliser
        l’esprit unique de votre rédaction. Vous pouvez créer jusqu'à 5 équipes maximum.
      </p>
      {teamNames.map((name, index) => (
        <div key={index} className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder={`Nom de l'équipe ${index + 1}`}
          />
        </div>
      ))}
      {teamNames.length < 5 && (
        <button onClick={addTeam} className="text-blue-500">Ajouter une équipe</button>
      )}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600"
      >
        Commencer
      </button>
    </div>
  );
}

export default TeamSetup;
