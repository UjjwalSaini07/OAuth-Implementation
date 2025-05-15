import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center text-white px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg sm:text-xl text-gray-400 mb-8">
        Oops! It looks like the page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-1"
      >
        Go to Login
      </button>
    </div>
  );
}

export default Error404;
