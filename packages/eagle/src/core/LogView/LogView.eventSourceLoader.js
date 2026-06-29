let eventSourceModulePromise = null;

export const loadEventSourceModule = () => {
  if (!eventSourceModulePromise) {
    eventSourceModulePromise = import("eventsource").catch((error) => {
      eventSourceModulePromise = null;
      throw error;
    });
  }

  return eventSourceModulePromise;
};
