import React from 'react';

function EventCard({ event, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <h3 className="text-lg font-bold mb-2">{event.name}</h3>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default EventCard;
