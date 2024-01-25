"use client";

import StampItem from "./StampItem";
import useStamps from "../context/stamps";

export default function StampContainer() {
  const { stamps } = useStamps();

  if (!stamps) {
    return <div>No stamps found.</div>;
  }

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
