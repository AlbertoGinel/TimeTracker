"use client";

import useCurrentActivity from "../context/currentActivity";
import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";

export default function CurrentActivity() {
  const [formattedLocalTime, setFormattedLocalTime] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { currentActivity, stop } = useCurrentActivity();

  const sendStamp = async ({ type, activitiesId }) => {
    try {
      let response = await fetch("/api/stamps", {
        method: "POST",
        body: JSON.stringify({
          type: type,
          activitiesId: activitiesId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        //console.log("Stamp sent successfully:", result);
        // Handle the successful response here
      } else {
        const errorData = await response.json();
        console.error("Error sending stamp:", errorData);
        // Handle the error response here
      }
    } catch (error) {
      console.error("Error sending stamp:", error);
      // Handle other errors (e.g., network issues) here
    }
  };

  const handleButtonClick = () => {
    //console.log("stoping: ", currentActivity);
    stop(currentActivity);
    sendStamp({
      type: "stop",
      activitiesId: currentActivity.idActivity,
    });
  };

  useEffect(() => {
    if (currentActivity && currentActivity.isStarted) {
      //console.log("currentActivity", currentActivity);
      const utcDateTime = DateTime.fromISO(currentActivity.timeStamp, {
        zone: "utc",
      });
      const localDateTime = utcDateTime.toLocal();

      setFormattedLocalTime(localDateTime.toFormat("HH:mm"));

      // Start the timer
      const intervalId = setInterval(() => {
        const now = DateTime.local();
        const elapsed = now.diff(utcDateTime, ["seconds"]).seconds;
        setElapsedSeconds(elapsed);
      }, 1000);

      // Clean up the interval when the component is unmounted or when isStarted becomes false
      return () => clearInterval(intervalId);
    }
  }, [currentActivity.timeStamp, currentActivity.isStarted]);

  // Conditionally render the main div based on isStarted
  if (!currentActivity.isStarted) {
    return null; // or return an empty div or any other content you want
  }

  const duration = Duration.fromObject({ seconds: elapsedSeconds });
  const formattedTime = duration.toFormat("hh:mm:ss");

  return (
    <div style={{ backgroundColor: currentActivity.color }}>
      Current Activity: {currentActivity.icon} {currentActivity.name}{" "}
      {formattedLocalTime}
      <button onClick={handleButtonClick}>⏹️</button>
      Elapsed Time: {formattedTime}
    </div>
  );
}
