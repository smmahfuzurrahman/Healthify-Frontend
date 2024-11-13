export const stringToTime = (dateString: Date) => {
  const date = new Date(dateString);

  // For custom formatting (e.g., DD/MM/YYYY)
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() is zero-based
  const year = date.getUTCFullYear();
  const customFormattedDate = `${day}/${month}/${year}`;
  return customFormattedDate;
};
