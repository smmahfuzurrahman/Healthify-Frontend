export const convertHourTime = (time: string) => {
  const [hours, minutes] = time.split(":");

  const AmPm = Number(hours) >= 12 ? "PM" : "AM";
  const convertedHour = Number(hours) % 12 || 12;
  return `${convertedHour}:${minutes} ${AmPm}`;
};
