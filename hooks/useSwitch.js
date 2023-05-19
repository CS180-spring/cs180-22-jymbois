import { useState } from 'react';

export const useVacation = (initialValue) => {
  const [isVacation, setIsVacation] = useState(initialValue);

  const vacationMode = () => {
    setIsVacation(!isVacation);
  };

  return [isVacation, vacationMode];
};

