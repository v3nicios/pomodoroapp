
interface IAppState {
    step: 1 | 2 | 3 | 4;
    currentStatus: "focus" | "short-breack" | "long-breake";
    isPaused: boolean;
    isRunning: boolean;
    time: number;
    countercicleTime: number;
    currentShortBreackcicleTime: number;
    currentLongBreakecicleTime: number;
    currentFocuscicleTime: number;
}

export const updateStateByElapsedTime = (appState: IAppState): IAppState => {

  if (!appState.isRunning || appState.isPaused) {
    return appState;
  }

  const now = Date.now();
  const elapsedSeconds = Math.floor((now - (appState.time ?? now)) / 1000);

  if (elapsedSeconds <= 0) return appState;


  let remaining = appState.countercicleTime;
  let timeLeft = remaining - elapsedSeconds;
  let currentStatus = appState.currentStatus;
  let step = appState.step;

  const advanceCycle = () => {
    
    if (currentStatus === 'focus') {
      if (step < 4) {
        step = (step + 1) as 1 | 2 | 3 | 4;
        currentStatus = 'short-breack';
        return appState.currentShortBreackcicleTime;
      } else {
        step = 1;
        currentStatus = 'long-breake';
        return appState.currentLongBreakecicleTime;
      }
    }

    if (currentStatus === 'short-breack' || currentStatus === 'long-breake') {
      currentStatus = 'focus';
      return appState.currentFocuscicleTime;
    }

    return remaining;
  };

  while (timeLeft <= 0) {
    const overflow = Math.abs(timeLeft);
    const nextTime = advanceCycle();
    timeLeft = nextTime - overflow;
  }
  return {
    ...appState,
    step,
    time: now,
    currentStatus,
    countercicleTime: timeLeft,
  };
}