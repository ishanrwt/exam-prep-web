import { useEffect, useState } from 'react';
import { getTestById } from '../data/testIndex.js';

const APP_STORAGE_KEY = 'tcs-nqt-mock-app';

function loadAppNavigation() {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return { selectedTestId: null, currentScreen: 'dashboard' };
    const parsed = JSON.parse(raw);
    const selectedTestId =
      typeof parsed.selectedTestId === 'string' ? parsed.selectedTestId : null;
    const validTest = selectedTestId && getTestById(selectedTestId);
    return {
      selectedTestId: validTest ? selectedTestId : null,
      currentScreen: validTest && parsed.currentScreen === 'evaluation'
        ? 'evaluation'
        : validTest
          ? 'exam'
          : 'dashboard',
    };
  } catch {
    return { selectedTestId: null, currentScreen: 'dashboard' };
  }
}

export function useAppNavigation() {
  const [hydrated, setHydrated] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  useEffect(() => {
    const saved = loadAppNavigation();
    setSelectedTestId(saved.selectedTestId);
    setCurrentScreen(saved.currentScreen);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (selectedTestId === null) {
      localStorage.removeItem(APP_STORAGE_KEY);
      return;
    }
    localStorage.setItem(
      APP_STORAGE_KEY,
      JSON.stringify({ selectedTestId, currentScreen })
    );
  }, [hydrated, selectedTestId, currentScreen]);

  const goToDashboard = () => {
    setSelectedTestId(null);
    setCurrentScreen('dashboard');
    localStorage.removeItem(APP_STORAGE_KEY);
  };

  const startTest = (testId) => {
    setSelectedTestId(testId);
    setCurrentScreen('exam');
  };

  return {
    hydrated: hydrated,
    selectedTestId,
    currentScreen,
    setCurrentScreen,
    startTest,
    goToDashboard,
  };
}
