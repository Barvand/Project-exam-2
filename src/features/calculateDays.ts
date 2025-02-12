export function calculateDays(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Ensures no negative days
}
