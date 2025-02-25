export const saveToLocalStorage = (name, data) => {
    try {
      localStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };
  
  export const getFromLocalStorage = (name) => {
    try {
      const data = localStorage.getItem(name);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  };
  