export const load = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null; // Return null if an error occurs
  }
};
 