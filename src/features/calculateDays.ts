/**
 * Calculates the number of days between two dates.
 *
 * @function
 * @param {Date | null} dateFrom - The start date.
 * @param {Date | null} dateTo - The end date.
 * @returns {number} The total number of days between the two dates, or `0` if either date is `null`.
 *
 * @description
 * - Converts both dates into `Date` objects.
 * - Computes the difference in time in milliseconds.
 * - Converts the difference into days and rounds up using `Math.ceil()`.
 *
 * @example
 * ```tsx
 * const totalDays = calculateDays(new Date("2024-06-10"), new Date("2024-06-15"));
 * console.log(totalDays); // Output: 5
 * ```
 */

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
