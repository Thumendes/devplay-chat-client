export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getHoursFromDate = (date: string | Date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
