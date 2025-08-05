import WordBox from "./components/WordBox";
import { useWordContext } from "./contexts/WordContext";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const { currentWords, shuffleWords, Timer } = useWordContext();
  const [inputText, setInputText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [rawWpm, setRawWpm] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [rawCount, setRawCount] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [finishedRace, setFinishedRace] = useState(false);

  useEffect(() => {
    shuffleWords();
  }, []);

  useEffect(() => {
    setStartTime(Date.now());
  }, [isTyping == true]);

  useEffect(() => {
    setInputText("");
    setCurrentLetterIndex(0);
    setCurrentIndex(0);
  }, [currentWords]);

  function endTest() {
    setTimeUp(true);
    if (!finishedRace) alert("Time Up!");
    const end = Date.now();
    const durationMin = (end - startTime) / 1000 / 60;
    setRawWpm(Math.floor(rawCount / 5 / durationMin));
    setWpm(Math.floor(charCount / 5 / durationMin));
    setCharCount(0);
    setRawCount(0);
    setInputText("");
    shuffleWords();
    setIsTyping(false);
  }

  function resetTest() {
    setTimeUp(false);
    setFinishedRace(false);
    setIsTyping(false);
    shuffleWords();
    setWpm(null);
    setRawWpm(null);
  }
  const onChange = (e) => {
    setFinishedRace(false);
    setTimeUp(false);
    setIsTyping(true);
    const value = e.target.value;
    if (value.length > inputText.length) {
      const newChar = value[value.length - 1];
      setRawCount((prev) => prev + 1);
    }

    setInputText(value);
    const typedWord = value;
    const currentWord = currentWords[currentIndex];

    if (value[currentLetterIndex] === currentWord[currentLetterIndex]) {
      setCurrentLetterIndex((prev) => prev + 1);
      setCharCount((prev) => prev + 1);
      console.log("charcount" + charCount, " rawCount: ", rawCount);
    }
    if (value.endsWith(" ")) {
      if (
        typedWord === currentWord + " " ||
        (currentIndex === currentWords.length - 1 &&
          currentLetterIndex === currentWord.length - 1)
      ) {
        setInputText("");
        setCharCount((prev) => prev + 1);
        setCurrentIndex((prev) => prev + 1);
        setCurrentLetterIndex(0);
      }
    }
    if (
      currentIndex === currentWords.length - 1 &&
      currentLetterIndex === currentWord.length - 1
    ) {
      setFinishedRace(true);
      endTest();
    }
    console.log(value);
  };

  return (
    <div class=" flex flex-col justify-center items-center text-center  md:mt-25  ">
      <h1 class="text-6xl mb-3.5 mt-6 font-bold text-center text-yellow-500 md:mb-8 md:text-9xl  md:pt-5 ">
        Speed Typing Test
      </h1>

      {timeUp ? (
        <p class="text-3xl mb-15 text-yellow-200 md:text-4xl md:mb-8">
          Start Typing to retake the test...
        </p>
      ) : (
        <p class="text-3xl mb-15 text-yellow-200 md:mb-8 md:text-4xl">Check Your WPM!</p>
      )}

      <div class="flex flex-col items-center justify-center ">
        {isTyping && <Timer onTimeUp={endTest} />}
        <input
          type="text"
          className="inputText"
          value={inputText}
          onChange={onChange}
          class="text-lg border-2 rounded-lg focus:outline-none bg-blue-100 caret-yellow-500 pl-1 md:text-4xl"
        ></input>
        <div
          className="Word-Box"
          class="p-2 text-2xl mb-10 mt-5 ml-3 mr-3 rounded-lg bg-gray-400 md:p-5 md:text-4xl md:mb-10 md:mt-5 "
        >
          <WordBox
            words={currentWords}
            currentWordIndex={currentIndex}
            currentLetterIndex={currentLetterIndex}
            inputText={inputText}
          />
        </div>
        <button
          className="restart_btn"
          class="border-2 rounded-full bg-yellow-100 mb-8 p-4 cursor-pointer hover:bg-yellow-200 md:mb-3 md:p-6"
          onClick={() => {
            resetTest();
          }}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z " />
            </svg>
          </span>
        </button>
        <div
          className="wpm-counter"
          class="flex flex-col text-3xl text-left text-yellow-200 mt-4 md:text-4xl md:mt-4 md:gap-8"
        >
          <p>WPM : {wpm ? wpm : "-"} </p>
          <span>Raw WPM : {rawWpm ? rawWpm : "-"}</span>
          <p>Accuracy : {wpm ? Math.floor((wpm / rawWpm) * 100) + "%" : "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
