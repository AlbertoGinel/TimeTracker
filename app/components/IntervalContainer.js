"use client";

import useIntervals from "../context/intervals";
import IntervalItem from "./IntervalItem";

export default function IntervalContainer() {
  const { intervals } = useIntervals();

  return (
    <>
      <div>
        {intervals?.map((interval) => (
          <IntervalItem key={interval.idFirstStamp} interval={interval} />
        ))}
      </div>
    </>
  );
}
