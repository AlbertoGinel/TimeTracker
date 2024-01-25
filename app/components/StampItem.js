"use client";

import * as moment from "moment";

export default function StampItem({ stamp }) {
  if (!stamp || !stamp.time) {
    return null;
  }

  const utcDateTime = moment.utc(stamp.time);

  if (!utcDateTime.isValid()) {
    return null;
  }

  const localDateTime = utcDateTime.local();

  const formattedLocalTime = localDateTime.format("HH:mm DD/MM/YY");

  const symbol =
    stamp.type === "start" ? "➡️" : stamp.type === "stop" ? "🛑" : "";

  return (
    <div style={{ backgroundColor: stamp.activities.color }}>
      <div>
        {stamp.activities.icon} {stamp.activities.name}
        {symbol}
      </div>
      <div>{formattedLocalTime}</div>
    </div>
  );
}
