import create from "zustand";

console.log("ZustandActivities");

const useActivities = create((set) => ({
  activities: [],
  setActivities: (newActivities) => {
    set({ activities: newActivities });
  },
}));

export default useActivities;
