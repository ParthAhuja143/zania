import { useEffect, useState } from 'react';

const useSaveWithInterval = (url: string, data: any[], interval: number, changesMade: boolean, onSaveSuccess: () => void) => {
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(Date.now());

  const saveData = async () => {
    if (!changesMade) return; // Avoid saving if no changes
    setLoading(true);
    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setLastSaved(Date.now()); // Reset timer after save
      onSaveSuccess(); // Call the callback to reset changesMade
    } catch (error) {
      console.error("Failed to save data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (changesMade) {
        setLastSaved(Date.now()); // Increment timer every 5 seconds
        saveData();
        onSaveSuccess()
      }
    }, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [data, changesMade, interval]);

  return { loading, lastSaved };
};

export default useSaveWithInterval;