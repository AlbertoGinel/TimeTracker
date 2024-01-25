import { createStore } from "zustand";

const initialState = {
  status: {
    index: 0,
  },
};

const parentStore = createStore(initialState);

const childStore1 = createStore({
  state: {
    completed: false,
  },
});

childStore1.use(parentStore.select("status.index"), (index) => {
  if (index === 0) {
    // Perform some asynchronous operation
    setTimeout(() => {
      childStore1.setState({ completed: true });
    }, 1000);
  }
});

const childStore2 = createStore({
  state: {
    completed: false,
  },
});

childStore2.use(parentStore.select("status.index"), (index) => {
  if (index === 1) {
    // Wait for childStore1 to complete
    if (!childStore1.get("completed")) {
      return;
    }

    // Perform some asynchronous operation
    setTimeout(() => {
      childStore2.setState({ completed: true });
    }, 1000);
  }
});

function triggerUpdates() {
  parentStore.setState({ status: { index: 0 } });
}

export { triggerUpdates };

// Use the parent store to trigger updates
triggerUpdates();
