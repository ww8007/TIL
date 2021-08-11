const cache: Record<string, any> = {};

export const createOrUse = <T>(key: string, callback: () => T) => {
  if (!cache[key]) {
    cache[key] = callback();
  }
  return cache[key];
};
