import { createContext, useState, useContext, useEffect } from "react";

const LifeContext = createContext();

export const useLife = () => {
  return useContext(LifeContext);
};

export const LifeProvider = ({ children, username }) => {
  const [lives, setLives] = useState(4);

  useEffect(() => {
    if (username) {
      const userLivesKey = `userLives_${username}`;
      try {
        const storedLives = localStorage.getItem(userLivesKey);

        const parsedLives = storedLives ? parseInt(storedLives, 10) : 4;
        setLives(
          isNaN(parsedLives) || parsedLives < 0 || parsedLives > 4
            ? 4
            : parsedLives
        );
      } catch (error) {
        console.error(
          `Failed to read lives for ${username} from localStorage:`,
          error
        );
        setLives(4);
      }
    } else {
      setLives(4);
    }
  }, [username]);

  useEffect(() => {
    if (username && lives !== undefined && lives !== null) {
      const userLivesKey = `userLives_${username}`;
      try {
        localStorage.setItem(userLivesKey, lives.toString());
      } catch (error) {
        console.error(
          `Failed to save lives for ${username} to localStorage:`,
          error
        );
      }
    }
  }, [lives, username]);

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
