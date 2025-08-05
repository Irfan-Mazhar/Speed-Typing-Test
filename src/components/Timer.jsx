import { useState, useEffect, useRef } from "react";
function Timer() {
  const [num, setNum] = useState(3);

  let intervalRef = useRef();

  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <div className="timer-parent">{num!==0?num:(clearInterval(intervalRef.current),"Time up!")}</div>;
}
export default Timer;
