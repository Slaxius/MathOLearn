import { createContext, useState, useContext, useEffect, useRef } from "react";

const MusicContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const MusicProvider = ({ children }) => {
  // Get initial backgroundMusic preference from localStorage or default true
  const [backgroundMusic, setBackgroundMusic] = useState(() => {
    const storedSettings = localStorage.getItem("preferences");
    const preferences = storedSettings ? JSON.parse(storedSettings) : {};
    return preferences.backgroundMusic !== undefined
      ? preferences.backgroundMusic
      : true;
  });

  const audioRef = useRef(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  // On first user interaction anywhere, enable user interaction flag and play audio if bg music enabled
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

  // Effect to control audio playback based on backgroundMusic and isUserInteracted
  useEffect(() => {
    if (audioRef.current) {
      if (backgroundMusic && isUserInteracted) {
        // Try play audio, catch promise rejection to avoid errors
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        // Pause and reset audio when backgroundMusic off or no user interaction yet
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [backgroundMusic, isUserInteracted]);

  // Toggle music on/off and persist in localStorage
  const toggleMusic = () => {
    setBackgroundMusic((prev) => {
      const newSetting = !prev;
      const storedSettings = JSON.parse(localStorage.getItem("preferences") || "{}");
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
          src="/assets/music/Growtopia OST - About theme.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </MusicContext.Provider>
  );
};

