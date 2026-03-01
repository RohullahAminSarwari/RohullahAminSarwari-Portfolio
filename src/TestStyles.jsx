import React from 'react';

const TestStyles = () => {
  return (
    <div className="p-8 m-8 bg-gray-800 rounded-lg border-4 border-blue-500">
      <h1 className="text-3xl font-bold text-purple-500 mb-4">Tailwind CSS Test</h1>
      <p className="text-gray-300 text-lg mb-6">
        If you can see this text with proper styling, then Tailwind CSS is working!
      </p>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="h-16 bg-red-500 rounded flex items-center justify-center text-white font-bold">Red</div>
        <div className="h-16 bg-green-500 rounded flex items-center justify-center text-white font-bold">Green</div>
        <div className="h-16 bg-blue-500 rounded flex items-center justify-center text-white font-bold">Blue</div>
      </div>
      
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105">
        Hover Me
      </button>
    </div>
  );
};

export default TestStyles;