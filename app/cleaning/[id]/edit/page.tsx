"use client";

import React, { useState } from 'react';

const CleaningEditPage = () => {
  const [error, setError] = useState(null);
  
  // Safe error display
  const displayError = () => {
    if (!error) return null;
    const errorMessage = typeof error === 'string' ? error : 
                         error instanceof Error ? error.message : 
                         'An unknown error occurred';
    
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
        {errorMessage}
      </div>
    );
  };

  return (
    <div>
      {displayError()}
      <h1>Edit Cleaning</h1>
      {/* Rest of the form and logic would go here */}
    </div>
  );
};

export default CleaningEditPage;

