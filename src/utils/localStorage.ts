import { LOCAL_STORAGE_KEY } from "../constants";

// types.ts
export interface CardType {
  type: string;
  title: string;
  position: number;
  src: string;
}

// Initialize LocalStorage with default data if not present
export const initializeLocalStorage = (defaultData: CardType[]): void => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedData) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
  }
};

// Fetch data from LocalStorage
export const getDataFromLocalStorage = (): CardType[] => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  console.log('[GETDATAFROMLS CALLED]')
  return storedData ? (JSON.parse(storedData) as CardType[]) : [];
};

// Add new data to LocalStorage
export const addDataToLocalStorage = (newData: CardType): void => {
  const storedData = getDataFromLocalStorage();
  const updatedData = [...storedData, newData];
  console.log('[ADDDATATOLS CALLED]')
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
};

export const addBulkDataToLocalStorage = (newData: CardType[]): void => {
  const storedData = getDataFromLocalStorage();
  console.log('[BULK CALLED]')
  const updatedData = [...storedData, ...newData];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
};

export const putDataToLocalStorage = (newData: CardType[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData)); // Save updated data back to LocalStorage
};
