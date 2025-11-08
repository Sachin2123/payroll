import { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    clearInterval(time);
  }, [time]);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const second = String(time.getSeconds()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${second}`;

  return <div>{formattedTime}</div>;
};

export default Timer;
