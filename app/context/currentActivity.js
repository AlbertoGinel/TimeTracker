import { create } from "zustand";

// Create a store
const useCurrentActivity = create((set) => ({
  currentActivity: {
    idActivity: "",
    idStamp: "",
    color: "",
    name: "no activity",
    icon: "",
    timeStamp: "",
    isStarted: false,
  },
  start: (activity) => {
    set({
      currentActivity: {
        idActivity: activity.idActivity,
        idStamp: activity.idStamp,
        color: activity.color,
        name: activity.name,
        icon: activity.icon,
        timeStamp: activity.time,
        isStarted: true,
      },
    });
  },
  stop: () => {
    set({
      currentActivity: {
        idActivity: "",
        idStamp: "",
        color: "",
        name: "",
        icon: "",
        timeStamp: "",
        isStarted: false,
      },
    });
  },
}));

export default useCurrentActivity;
