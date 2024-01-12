import { create } from "zustand";

const makeIntervals = (stamps) => {
  // Your implementation for makeIntervals
  // ...
  //return newIntervals;
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

//can I define makeIntervals here?
