import { create } from "zustand";
import * as moment from "moment";
import "moment-timezone";

console.log("ZustandIntervals");

const sameActivityInARow = (stamps) => {
  const result = stamps.reduce((acc, currentStamp, index) => {
    if (
      index > 0 &&
      stamps[index - 1].type === "start" &&
      currentStamp.type === "start" &&
      currentStamp.idActivity === stamps[index - 1].idActivity
    ) {
      return acc;
    }

    return [...acc, currentStamp];
  }, []);

  return result;
};

const shortStamps = (stamps, thresholdInSeconds) => {
  const result = stamps.reduce((acc, currentStamp, index, array) => {
    if (index > 0 && array[index - 1].type === "start") {
      const timeFormat = "YYYY-MM-DDTHH:mm:ss.000Z";
      const currentTime = moment(currentStamp.time, timeFormat);
      const previousTime = moment(array[index - 1].time, timeFormat);

      if (currentTime.diff(previousTime, "seconds") < thresholdInSeconds) {
        return acc;
      }
    }

    return [...acc, currentStamp];
  }, []);
};

const makeIntervals = (stamps) => {
  let index = 0;
  let intervals = [];

  const sortedStamps = stamps
    .slice()
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  console.log("entrada shorted:", stamps);

  //const sortedStamps = shortStamps(sortedStamps2, 30);

  //console.log("salida shorted:", sortedStamps);

  if (sortedStamps.length > 0) {
    while (index < sortedStamps.length) {
      if (sortedStamps[index].type === "start") {
        const newInterval = {
          from: sortedStamps[index].time,
          to: "",
          color: sortedStamps[index].activities.color,
          name: sortedStamps[index].activities.name,
          icon: sortedStamps[index].activities.icon,
          idActivity: sortedStamps[index].activitiesId,
          idFirstStamp: sortedStamps[index].id,
        };
        if (index + 1 < sortedStamps.length) {
          const dateTime = moment(sortedStamps[index + 1].time);
          const subtractedTime = dateTime.tz("UTC").subtract(1, "seconds");
          newInterval.to = subtractedTime
            .tz("UTC")
            .format("YYYY-MM-DDTHH:mm:ss.000Z");
        } else {
          newInterval.to = "open";
        }
        intervals.push(newInterval);
      }
      index++;
    }
  }
  return intervals.slice().reverse();
};

// Create a store
const useIntervals = create((set) => ({
  intervals: [],
  loadIntervals: (stamps) => {
    const newIntervals = makeIntervals(stamps);
    set({ intervals: newIntervals });
  },
}));

export default useIntervals;
