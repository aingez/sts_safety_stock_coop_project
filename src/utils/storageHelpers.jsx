// Utility function to fetch from storage
export const getStorageValue = (key, defaultValue, storageType = "session") => {
  if (typeof window !== "undefined") {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    return storage.getItem(key) || defaultValue;
  }
  return defaultValue;
};
