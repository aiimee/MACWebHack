import React, { createContext, useState } from 'react';

export const TaskUpdateContext = createContext();

export const TaskUpdateProvider = ({ children }) => {
  const [updateFlag, setUpdateFlag] = useState(false);

  const triggerUpdate = () => {
    setUpdateFlag(prev => !prev); // Toggle to trigger useEffect
  };

  return (
    <TaskUpdateContext.Provider value={{ updateFlag, triggerUpdate }}>
      {children}
    </TaskUpdateContext.Provider>
  );
};
