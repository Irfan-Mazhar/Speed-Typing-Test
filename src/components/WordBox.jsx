import { useState, useEffect } from "react";
import "../css/WordBox.css";
function WordBox({ words, currentWordIndex, currentLetterIndex, inputText }) {
  console.log("currentWordIndex: ",currentWordIndex , "currentLetterINdex: ",currentLetterIndex)
  // console.log(words)
  if (!words || words.length === 0) return null;
  return (
    <div className="wordBox-parent" >
      {words.map((word, windex) => (
        <span key = {windex} className={word}>

          {word.split("").map((letter, lindex) => {
            
            let classname = "";
            // let flag = 0;
            if (windex <= currentWordIndex) {
              if(lindex >= currentLetterIndex && letter!= currentLetterIndex) classname = "highlightLetter"
              if (lindex < inputText.length) {
                if(inputText[lindex]===letter  ) {classname = "correctLetter";}
                else {classname = "incorrectLetter"; }
              }
              
              // if(windex == currentWordIndex) classname = "highlightLetter"
              // if(incorrectLetter && lindex>=currentLetterIndex) classname = "incorrectLetter"
              if (windex < currentWordIndex)
                 classname = "correctLetter";
              // if(lindex>currentLetterIndex &&)
            }
            return (
              <span key={`${windex}-${lindex}`} className={classname}>
                {letter}
              </span>
            );
  
            // </p>
          })}
          
          </span>

      )
      )}
    </div>
  );
}
export default WordBox;
