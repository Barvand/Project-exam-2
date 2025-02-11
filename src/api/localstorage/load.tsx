export const load = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null; // Ensure JSON.parse only gets a string
  } catch {
    return null; // Return null if an error occurs
  }
};
