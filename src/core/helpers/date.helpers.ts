export const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const toTimeString = (date: Date) => {
  return date.toISOString().slice(11, 16);
};
