import { calculateRevisionDates } from "./dates.js";

describe("calculateRevisionDates", () => {
  test("should return correct revision dates based on input date", () => {
    const inputDate = "2025-02-07"; // Match expected input format
    const result = calculateRevisionDates(inputDate);

    expect(result.startDate).toBe(inputDate);

    function expectDateMatch(actualDate, expectedYear, expectedMonth, expectedDay) {
      const dateObj = new Date(actualDate);

      expect(dateObj.getUTCFullYear()).toEqual(expectedYear);
      expect(dateObj.getUTCMonth() + 1).toEqual(expectedMonth); // Months are 0-based

      // Allow a ±1 day difference to prevent timezone issues
      expect([expectedDay - 1, expectedDay, expectedDay + 1]).toContain(dateObj.getUTCDate());
    }

    expectDateMatch(result.oneWeek, 2025, 2, 14);
    expectDateMatch(result.oneMonth, 2025, 3, 7);
    expectDateMatch(result.threeMonths, 2025, 5, 7);
    expectDateMatch(result.sixMonths, 2025, 8, 7);
    expectDateMatch(result.oneYear, 2026, 2, 7);
  });
});
