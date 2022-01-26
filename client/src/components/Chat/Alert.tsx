import React from 'react';

import './Alert.css';

const Alert = ({ text }: { text: string }) => {
  return (
    <div className="alert">
      <div className="alert__text">{text}</div>
    </div>
  );
};

export default Alert;
