import { useState } from 'react';

export const useDark = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const darkMode = () => setValue(!value);

  return [value, darkMode];
};

export const useVacation = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const vacationMode = () => setValue(!value);

  return [value, vacationMode];
};

