import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const   Loading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen flex-col dark:bg-dark-bg dark:text-white">
    <HashLoader color="#1da1f2" size={48} />
    <span className="ml-4 text-lg">Loading...</span>
  </div>
);

export default Loading;