import WordBox from "./components/WordBox";
// import Timer from "./components/Timer";
import { useWordContext } from "./contexts/WordContext";
import { useState, useEffect, use } from "react";
import "./App.css";

function App() {
  const { currentWords, shuffleWords, Timer } = useWordContext();
  const [inputText, setInputText] = useState("");
  const [wordList, setWordList] = useState(currentWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
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

  // const timer = setInterval(WordBox,300)

  useEffect(() => {
    // (currentWords);
    setInputText("");
    setCurrentLetterIndex(0);
    setCurrentIndex(0);
  }, [currentWords]);

  function endTest() {
    // setEndTime(Date.now());
    setTimeUp(true);
    // setFinishedRace(true);
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
    setIsTyping(false);
    shuffleWords();
    setWpm(null);
    setRawWpm(null);
  }
  const onChange = (e) => {
    // setHasTimeUp(false)
    setFinishedRace(false);
    setTimeUp(false);
    setIsTyping(true);
    const value = e.target.value;
    // if(inputText!=="")
    //   setRawCount((prev) => prev+1)
    if (value.length > inputText.length) {
      const newChar = value[value.length - 1];
      // if (newChar !== " ") {
      setRawCount((prev) => prev + 1);
      // }
    }

    setInputText(value);
    const typedWord = value;
    const currentWord = currentWords[currentIndex];

    if (value[currentLetterIndex] === currentWord[currentLetterIndex]) {
      setCurrentLetterIndex((prev) => prev + 1);
      setCharCount((prev) => prev + 1);
      console.log("charcount" + charCount, " rawCount: ", rawCount);
    }
    // console.log("current Letter: " + currentWord[currentLetterIndex]);
    // console.log("typed word" + typedWord);
    // console.log("current word", currentWord);
    // console.log("current word join", currentWord + " ");
    // console.log(wordList);
    if (value.endsWith(" ")) {
      if (
        typedWord === currentWord + " " ||
        (currentIndex === currentWords.length - 1 &&
          currentLetterIndex === currentWord.length - 1)
      ) {
        // const newList = wordList.shift()
        // setWordList(newList);
        setInputText("");
        // setCharCount((prev) => prev +(currentWord.length))
        setCharCount((prev) => prev + 1);
        setCurrentIndex((prev) => prev + 1);
        setCurrentLetterIndex(0);
      }
    }
    // console.log(
    //   currentIndex,
    //   wordList.length,
    //   currentLetterIndex,
    //   currentWord.length
    // );
    if (
      currentIndex === currentWords.length - 1 &&
      currentLetterIndex === currentWord.length - 1
    ) {
      // setEndTime(Date.now());
      // const end = Date.now();
      // const durationMin = ((end-startTime) /1000) /60;
      // setRawWpm(Math.floor((rawCount/5)/durationMin))
      // setWpm(Math.floor((charCount/5)/durationMin))
      // setCharCount(0);
      // setRawCount(0);
      // shuffleWords();
      // setIsTyping(false);
      // setEndTime(Date.now());
      setFinishedRace(true);
      endTest();
      // console.log("start time: ",startTime,"end time",endTime)
      // console.log("min : " , durationMin)
      // clearInterval(internalRef.current)
    }
    console.log(value);
  };

  return (
    <div class = " flex flex-col justify-center items-center mt-30 ">
      <h1 class = "text-7xl font-bold text-yellow-500 mb-6 text-2xl pt-5">Speed Typing Test</h1>

      {finishedRace ? (
        <p class= "mb-8 text-yellow-200 text-2xl">Start Typing to retake the test...</p>
      ) : timeUp ? (
        <p class = "mb-8 text-yellow-200 text-2xl">Time's Up!</p>,alert("time Up")
      ) : (
        <p class = "mb-8 text-yellow-200 text-2xl">Check Your WPM!</p>
      )}

      <div class= "flex flex-col items-center justify-center ">
        {isTyping && <Timer onTimeUp={endTest} />}
        <input
          type="text"
          className="inputText"
          value={inputText}
          onChange={onChange}
          class = "border-2 rounded-lg focus:outline-none bg-blue-100 text-2xl"
        ></input>
        <div className="Word-Box" class ="p-5 text-2xl mb-10 bg-gray-400 mt-5 rounded-lg">
          <WordBox
            words={currentWords}
            currentWordIndex={currentIndex}
            currentLetterIndex={currentLetterIndex}
            inputText={inputText}
          />
        </div>
        <button
          className="restart_btn"
          class="border-2 rounded-full bg-yellow-100 mb-3 p-4"
          onClick={() => {
            resetTest();
          }}
        >
          <span >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z "/></svg>
          </span>
        </button>
        <div className="wpm-counter" class="flex mt-4 gap-6 text-yellow-200 text-2xl">
          <p>WPM : {wpm ? wpm : "-"} </p>
          <span>Raw WPM : {rawWpm ? rawWpm : "-"}</span>
          <p>Accuracy : {wpm ? Math.floor((wpm / rawWpm) * 100) + "%" : "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
