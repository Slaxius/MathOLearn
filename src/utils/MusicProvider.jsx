import { createContext, useState, useContext, useEffect, useRef } from "react";

import musicSrc from "/assets/music/Growtopia OST - About theme.mp3"

const MusicContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const MusicProvider = ({ children }) => {
  const [backgroundMusic, setBackgroundMusic] = useState(() => {
    const storedSettings = localStorage.getItem("preferences");
    const preferences = storedSettings ? JSON.parse(storedSettings) : {};
    return preferences.backgroundMusic !== undefined
      ? preferences.backgroundMusic
      : true;
  });

  const audioRef = useRef(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  const handleUserInteraction = () => {
    if (!isUserInteracted) {
      setIsUserInteracted(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (backgroundMusic && isUserInteracted) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [backgroundMusic, isUserInteracted]);

  const toggleMusic = () => {
    setBackgroundMusic((prev) => {
      const newSetting = !prev;
      const storedSettings = JSON.parse(
        localStorage.getItem("preferences") || "{}"
      );
      localStorage.setItem(
        "preferences",
        JSON.stringify({ ...storedSettings, backgroundMusic: newSetting })
      );
      return newSetting;
    });
  };

  return (
    <MusicContext.Provider value={{ backgroundMusic, toggleMusic }}>
      {children}
      <audio ref={audioRef} id="background-music" loop>
        <source
          src={musicSrc}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </MusicContext.Provider>
  );
};
