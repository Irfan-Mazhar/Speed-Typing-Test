import "../css/WordBox.css";
function WordBox({ words, currentWordIndex, currentLetterIndex, inputText }) {
  console.log(words.length);
  const words_per_line = 30;
  const currentLine = Math.floor(currentWordIndex / words_per_line);
  const start = currentLine * words_per_line;
  const end = start + words_per_line;
  const visible_line = words.slice(start, end);
  if (!words || words.length === 0) return null;
  return (
    <div className="wordBox-parent">
      {visible_line.map((word, windex) => {
        const globalWindex = start + windex;
        return (
          <span key={globalWindex}>
            {word.split("").map((letter, lindex) => {
              let classname = "";
              if (globalWindex <= currentWordIndex) {
                if (
                  lindex >= currentLetterIndex &&
                  letter != currentLetterIndex
                )
                  classname = "highlightLetter";
                if (lindex < inputText.length) {
                  if (inputText[lindex] === letter) {
                    classname = "correctLetter";
                  } else {
                    classname = "incorrectLetter";
                  }
                }
                if (globalWindex < currentWordIndex)
                  classname = "correctLetter";
              }
              return (
                <span key={`${globalWindex}-${lindex}`} className={classname}>
                  {letter}
                </span>
              );
            })}
            &nbsp;
          </span>
        );
      })}
    </div>
  );
}
export default WordBox;
