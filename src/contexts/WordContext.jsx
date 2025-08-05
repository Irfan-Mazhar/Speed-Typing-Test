import { useContext, createContext, useState, useEffect, useRef } from "react";

const WordContext = createContext();

export const useWordContext = () => useContext(WordContext);

export const WordProvider = ({ children }) => {
  const [currentWords, setCurrentWords] = useState([]);
  const words = [
    "some",
    "after",
    "before",
    "eat",
    "doodle",
    "fight",
    "sleep",
    "paper",
    "goku",
    "flute",
    "rasengan",
    "office",
    "bottle",
    "dwight",
    "mineral",
    "tokyo",
    "fried",
    "rizz",
    "ultimate",
    "horrid",
    "naruto",
    "eighty",
    "six",
    "arigato",
    "macha",
    "oreo",
    "racist",
    "baka",
    "small",
    "nation",
    "ukulele",
    "information",
    "strong",
    "goat",
    "impression",
    "college",
    "university",
    "take",
    "hat",
    "where",
    "what",
    "how",
    "much",
    "now",
    "see",
    "could",
    "free",
    "pirate",
    "type",
    "nice",
  ];

  const shuffle = (words) => {
    const arr = [...words];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  const shuffleWords = () => {
    const res = shuffle(words);
    setCurrentWords(res);
  };

  function Timer({ onTimeUp }) {
    const [num, setNum] = useState(30);
    const [hasTimeUp, setHasTimeUp] = useState(false);
    const intervalRef = useRef();

    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setNum((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
      if (num === 0 && !hasTimeUp) {
        clearInterval(intervalRef.current);
        setHasTimeUp(true);
        onTimeUp();
      }
    }, [num, hasTimeUp, onTimeUp]);

    return (
      <div className="timer-parent " class="text-2xl text-white mb-2 md:text-3xl">
        {num}
      </div>
    );
  }
  const value = {
    words,
    shuffleWords,
    currentWords,
    setCurrentWords,
    Timer,
  };
  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};
