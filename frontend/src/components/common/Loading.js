import React from 'react';

const Loading = ({ message = 'Chargement...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="spinner mb-4"></div>
      <p className="text-gray-medium">{message}</p>
    </div>
  );
};

export default Loading;
