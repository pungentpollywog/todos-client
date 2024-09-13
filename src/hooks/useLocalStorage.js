import { useState, useEffect } from 'react';

function getStoredValue(defaultValue, key) {
  const storageValue = window.localStorage.getItem(key);
  return storageValue !== null ? JSON.parse(storageValue) : defaultValue;
}

export function useLocalStorage(defaultValue, key) {
  const initialValue = getStoredValue(defaultValue, key);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log('update local storage with', JSON.stringify(value));
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
