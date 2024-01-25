import create from "zustand";

console.log("ZustandStamps");

const useStamps = create((set) => ({
  stamps: [],
  setStamps: (newStamps) => {
    set({ stamps: newStamps });
  },
}));

export default useStamps;
