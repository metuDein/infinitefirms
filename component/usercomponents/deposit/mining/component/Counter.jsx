import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("countdownEndTime" || 0);
    const endTime = savedEndTime
      ? new Date(savedEndTime)
      : new Date().getTime() + 30 * 60 * 1000;

    if (!savedEndTime) {
      localStorage.setItem("countdownEndTime", endTime);
    }

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeDiff = endTime - now;

      if (timeDiff <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
        localStorage.removeItem("countdownEndTime");
      } else {
        setTimeLeft(Math.floor(timeDiff / 1000));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default CountdownTimer;
