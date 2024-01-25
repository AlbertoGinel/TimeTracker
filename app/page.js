"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ActivityContainer from "./components/ActivityContainer";
import StampContainer from "./components/StampContainer";
import useActivities from "./context/activities";
import useStamps from "./context/stamps";
import useIntervals from "./context/intervals";
import useCurrentActivity from "./context/currentActivity";
import IntervalContainer from "./components/IntervalContainer";

export default function Home() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);

  const { setStamps, stamps } = useStamps();
  const { setActivities, activities } = useActivities();
  const { currentActivity, start } = useCurrentActivity();
  const { loadIntervals, intervals } = useIntervals();

  const getActivities = async () => {
    const response = await fetch("/api/activities");

    const activities = await response.json();

    setActivities(activities);
  };

  const getStamps = async () => {
    const response = await fetch("/api/stamps");
    const stampList = await response.json();

    const lastStamp =
      stampList.length > 0 ? stampList[stampList.length - 1] : null;

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
  };
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
    getActivities();
    getStamps();
    console.log("antes de hacer loadIntervals: ", stamps.length);
    loadIntervals(stamps);
  }, [currentActivity]);

  return (
    <>
      <div>Client render forever: {user?.email}</div>
      {user && (
        <>
          <div className="grid grid-cols-8 gap-4">
            <div className="bg-gray-300 p-4 col-span-1">
              {user && activities.length > 0 && <ActivityContainer />}
            </div>
            <div className="bg-gray-300 p-4 col-span-2">
              {user && stamps.length > 0 && <StampContainer />}
            </div>
            <div className="bg-gray-300 p-4 col-span-3">
              {user && intervals.length > 0 && <IntervalContainer />}
            </div>
            <div className="bg-gray-300 p-4 col-span-2">Days</div>
          </div>
        </>
      )}
    </>
  );
}
