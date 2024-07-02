import React, { createContext, useState } from 'react';

export const DropdownVizContext = createContext();

export const DropdownVizProvider = ({ children }) => {
  const [selectedValueQ1, setSelectedValueQ1] = useState("Bar");
  const [selectedValueQ2, setSelectedValueQ2] = useState("Exploratory");
  const [Info, setInfo] = useState("");

  return (
    <DropdownVizContext.Provider value={{ selectedValueQ1, setSelectedValueQ1, selectedValueQ2, setSelectedValueQ2, Info, setInfo }}>
      {children}
    </DropdownVizContext.Provider>
  );
};
