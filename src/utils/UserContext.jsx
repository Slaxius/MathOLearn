import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem("currentUserId") || null;
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "currentUserId") {
        setCurrentUserId(e.newValue || null);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </UserContext.Provider>
  );
};