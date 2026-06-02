export const minDelay = async (startTime, minDuration = 500) => {
  const elapsed = Date.now() - startTime;

  if (elapsed < minDuration) {
    await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
  }
};
