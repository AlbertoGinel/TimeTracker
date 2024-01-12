"use client";

import { DateTime } from "luxon";

export default function StampItem({ stamp }) {
  // Check if stamp or stamp.time is undefined
  if (!stamp || !stamp.time) {
    return null; // or handle the missing data in a different way
  }

  const utcDateTime = DateTime.fromISO(stamp.time, { zone: "utc" });

  // Check if the conversion to local time was successful
  if (!utcDateTime.isValid) {
    return null; // or handle the invalid date in a different way
  }

  const localDateTime = utcDateTime.toLocal();

  // Format the result
  const formattedLocalTime = localDateTime.toFormat("HH:mm dd/MM/yy");

  const symbol =
    stamp.type === "start" ? "➡️" : stamp.type === "stop" ? "🛑" : "";

  return (
    <div style={{ backgroundColor: stamp.activities.color }}>
      <span>
        {stamp.activities.icon} {stamp.activities.name}
        {symbol} {formattedLocalTime}
      </span>
    </div>
  );
}
