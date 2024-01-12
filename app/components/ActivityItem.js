"use client";

import useCurrentActivity from "../context/currentActivity";

export default function ActivityItem({ activity }) {
  //Zustand
  const { start } = useCurrentActivity();

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
        return result;
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

  const handleButtonClick = async () => {
    const currentDate = new Date();

    //console.log("activityItem: ", activity);

    try {
      const newID = await sendStamp({
        type: "start",
        activitiesId: activity.id,
      });

      start({
        ...activity,
        time: currentDate.toISOString(),
        idStamp: newID.id,
      });
    } catch (error) {
      console.error("Error in handleButtonClick:", error);
    }
  };

  return (
    <div style={{ backgroundColor: activity.color }}>
      <span>
        {activity.icon}
        {activity.name}
      </span>
      <button onClick={handleButtonClick}>▶</button>
    </div>
  );
}
