"use client";

import useCurrentActivity from "../context/currentActivity";
import * as moment from "moment";
import "moment-timezone"; // Make sure to import the timezone data
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
      } else {
        const errorData = await response.json();
        console.error("Error sending stamp:", errorData);
      }
    } catch (error) {
      console.error("Error sending stamp:", error);
    }
  };

  const handleButtonClick = () => {
    stop(currentActivity);
    sendStamp({
      type: "stop",
      activitiesId: currentActivity.idActivity,
    });
  };

  useEffect(() => {
    if (currentActivity && currentActivity.isStarted) {
      const utcDateTime = moment.utc(currentActivity.timeStamp);
      const localDateTime = utcDateTime.local();

      setFormattedLocalTime(localDateTime.format("HH:mm"));

      // Start the timer
      const intervalId = setInterval(() => {
        const now = moment();
        const elapsed = now.diff(utcDateTime, "seconds");
        setElapsedSeconds(elapsed);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentActivity.timeStamp, currentActivity.isStarted]);

  if (!currentActivity.isStarted) {
    return null;
  }

  const formattedTime = moment.utc(elapsedSeconds * 1000).format("HH:mm:ss");

  return (
    <div style={{ backgroundColor: currentActivity.color }}>
      Current Activity: {currentActivity.icon} {currentActivity.name}{" "}
      {formattedLocalTime}
      <button onClick={handleButtonClick}>⏹️</button>
      Elapsed Time: {formattedTime}
    </div>
  );
}
