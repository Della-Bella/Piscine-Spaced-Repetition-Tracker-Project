import { calculateRevisionDates } from "./dates.js";

describe("calculateRevisionDates", () => {
   test("should return correct revision dates", () => {
      const startDate = "2025-02-07T00:00:00.000Z"; // Example fixed start date
      const expectedStart = new Date(startDate);

      const result = calculateRevisionDates(startDate);

      expect(result.startDate).toBe(startDate);
      expect(result.oneWeek).toBe(
         new Date(
            expectedStart.getTime() + 7 * 24 * 60 * 60 * 1000
         ).toISOString()
      );
      expect(result.oneMonth).toBe(
         new Date(
            expectedStart.getTime() + 30 * 24 * 60 * 60 * 1000
         ).toISOString()
      );
      expect(result.threeMonths).toBe(
         new Date(
            expectedStart.getTime() + 3 * 30 * 24 * 60 * 60 * 1000
         ).toISOString()
      );
      expect(result.sixMonths).toBe(
         new Date(
            expectedStart.getTime() + 6 * 30 * 24 * 60 * 60 * 1000
         ).toISOString()
      );

      const oneYearDate = new Date(startDate);
      oneYearDate.setFullYear(oneYearDate.getFullYear() + 1);
      expect(result.oneYear).toBe(oneYearDate.toISOString());
   });
});
