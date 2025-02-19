export const calculateDays = (
  dateFrom: Date | null,
  dateTo: Date | null
): number => {
  if (!dateFrom || !dateTo) return 0; // Return 0 if either date is null

  const from = new Date(dateFrom);
  const to = new Date(dateTo);

  const differenceInTime = to.getTime() - from.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
};
