// app/hooks/useKenyaTowns.ts
import { useState, useEffect } from 'react';

export type TownSelectValue = {
  value: string;
  label: string;
  region: string;
  latlng: number[];
  county: string;
};

const useKenyaTowns = () => {
  const [towns, setTowns] = useState<TownSelectValue[]>([]);

  useEffect(() => {
    fetch('/kenyaTowns.json')
      .then((response) => response.json())
      .then((data) => setTowns(data))
      .catch((error) => console.error('Error loading towns:', error));
  }, []);

  const getTownByValue = (value: string) =>
    towns.find((town) => town.value === value);

  const getAllTowns = () => towns;

  return { towns, getTownByValue, getAllTowns };
};

export default useKenyaTowns;
