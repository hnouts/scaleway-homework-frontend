import React from 'react';

const Loading: React.FC = () => {
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px' }} data-testid="loading">
      <p>Loading...</p>
    </div>
)};

export default Loading;
