import { useState, useEffect, useCallback } from "react";

const Timer = ({ shippingInfo }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = useCallback(() => {
    const endDateString = shippingInfo.split("-").pop().trim();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const endDate = new Date(`${endDateString} ${currentYear}`);

    // Check if endDate is a valid date
    if (isNaN(endDate)) return null;

    const difference = endDate - currentDate;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  }, [shippingInfo]);

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [calculateTimeLeft]);

  if (!timeLeft.days) {
    return <div>Don't miss this bargain!!</div>;
  }

  return (
    <div>
      Deal ends in:
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default Timer;
