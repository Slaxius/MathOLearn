import { createContext, useState, useContext, useEffect } from "react";

const LifeContext = createContext();

export const useLife = () => {
  return useContext(LifeContext);
};

export const LifeProvider = ({ children }) => {
  const [lives, setLives] = useState(() => {
    try {
      const storedLives = localStorage.getItem("userLives");
      const parsedLives = storedLives ? parseInt(storedLives, 10) : 4;
      return isNaN(parsedLives) || parsedLives < 0 || parsedLives > 4
        ? 4
        : parsedLives;
    } catch (error) {
      console.error("Failed to read userLives from localStorage:", error);
      return 4;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("userLives", lives.toString());
    } catch (error) {
      console.error("Failed to save userLives to localStorage:", error);
    }
  }, [lives]);

  const refillLives = () => {
    setLives(4);
  };

  const deductLife = () => {
    setLives((prevLives) => Math.max(0, prevLives - 1));
  };

  const contextValue = {
    lives,
    refillLives,
    deductLife,
  };

  return (
    <LifeContext.Provider value={contextValue}>{children}</LifeContext.Provider>
  );
};
