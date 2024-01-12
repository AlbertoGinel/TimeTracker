"use client";

import { useEffect, useState } from "react";
import StampItem from "./StampItem";
import useCurrentActivity from "../context/currentActivity";
import useIntervals from "../context/intervals";

export default function StampContainer() {
  const [stamps, setStamps] = useState([]);
  const { currentActivity, start } = useCurrentActivity();
  const { loadIntervals, intervals } = useIntervals();

  const getStamps = async () => {
    const response = await fetch("/api/stamps");
    const stampList = await response.json();

    const lastStamp =
      stampList.length > 0 ? stampList[stampList.length - 1] : null;

    //console.log(lastStamp.activitiesId, " ", currentActivity.idActivity);
    //console.log("currentActivity: ", currentActivity);

    if (
      lastStamp &&
      lastStamp.type === "start" &&
      lastStamp.activitiesId !== currentActivity.idActivity
    ) {
      start({
        idActivity: lastStamp.activitiesId,
        idStamp: lastStamp.id,
        color: lastStamp.activities.color,
        name: lastStamp.activities.name,
        icon: lastStamp.activities.icon,
        time: lastStamp.time,
      });
    }

    setStamps([]);
    setStamps(stampList);
    //call the intervals:
    loadIntervals(stamps);
  };

  useEffect(() => {
    getStamps();
  }, [currentActivity]); // Trigger getStamps when currentActivity changes

  return (
    <>
      <div>
        {[...stamps].reverse().map((stamp) => (
          <StampItem key={stamp.id} stamp={stamp} />
        ))}
      </div>
    </>
  );
}
