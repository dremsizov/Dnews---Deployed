import { useState } from 'react';

export default function useLocalStorage(key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    });

    function setLocalStorage(newValue) {
        if (newValue) {
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        } else {
            localStorage.removeItem(key);
            setValue(null);
        }
    }

    return [value, setLocalStorage];
}