"use client";

import { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import CurrentActivity from "./CurrentActivity";

export default function ActivityContainer() {
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const response = await fetch("/api/activities");
    const activities = await response.json();
    setActivities([]);
    setActivities(activities);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <div>
        <CurrentActivity />
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  );
}
