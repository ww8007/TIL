export const makeArray = (length: number) => new Array(length).fill(null);
export const random = (min: number, max: number) =>
  Math.round(Math.random() * (max - min)) + min;
export const unsplashURL = (width: number, height: number) =>
  `https://source.unsplash.com/random/${width}x${height}`;
export const avatarUriByName = (name: string) =>
  `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}`;
