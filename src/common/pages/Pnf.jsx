import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

function Pnf() {
  return (
    // Main container: Centers content vertically and horizontally (min-h-screen, flex, items-center, justify-center)
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 sm:p-10">
      
      <div className="text-center">
        
        {/* Large 404 Heading */}
        <h1 className="text-9xl font-extrabold text-indigo-600 tracking-wider animate-bounce">
          404
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">
          Page Not Found
        </h2>
        
        {/* Content/Message */}
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          It looks like the page you were looking for doesn't exist or has been moved. 
          The link you followed might be broken.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          
          {/* Go to Homepage Button */}
          {/* Uses the Link component for internal navigation */}
          <Link 
            to="/" 
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go to Homepage
          </Link>
        
        </div>
        
        {/* Optional Footer/Hint */}
        <div className="mt-10 text-sm text-gray-400">
          <p>If the problem persists, please check the URL for typos.</p>
        </div>
        
      </div>
    </div>
  );
}

export default Pnf;