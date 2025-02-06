// Function to calculate dates revision
export function calculateRevisionDates(startDate) {
   const start = new Date(startDate);
   // console.log("calculateRevisionDates called with startDate:", startDate);
   return {
      startDate: startDate,
      oneWeek: new Date(
         start.getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      oneMonth: new Date(
         start.getTime() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      threeMonths: new Date(
         start.getTime() + 3 * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      sixMonths: new Date(
         start.getTime() + 6 * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      oneYear: new Date(
         start.setFullYear(start.getFullYear() + 1)
      ).toISOString(),
   };
}
