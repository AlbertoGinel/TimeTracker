"use client";

import ActivityItem from "./ActivityItem";
import CurrentActivity from "./CurrentActivity";
import useActivities from "../context/activities";

export default function ActivityContainer() {
  const { activities } = useActivities();

  return (
    <>
      <div>
        <CurrentActivity />
        {activities?.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  );
}
