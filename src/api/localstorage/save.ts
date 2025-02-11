export const save = (key: string, value: string) => { 
    localStorage.setItem(key, JSON.stringify(value));
};
