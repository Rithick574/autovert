export const setLocalStorageItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item in localStorage", error);
  }
};

export const getLocalStorageItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error getting item from localStorage", error);
    return null;
  }
};

export const removeLocalStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage", error);
  }
};
