// Function to calculate dates revision / New Comit
export function calculateRevisionDates(startDate) {
   const start = new Date(startDate);
   // console.log("calculateRevisionDates called with startDate:", startDate);
   const oneWeekDate = new Date(start);
   const oneMonthDate = new Date(start);
   const threeMonthsDate = new Date(start);
   const sixMonthsDate = new Date(start);
   const oneYearDate = new Date(start);

   return {
      startDate: startDate,
      oneWeek: new Date(
         oneWeekDate.getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      oneMonth: new Date(
         oneMonthDate.setMonth(oneMonthDate.getMonth() + 1)
      ).toISOString(),
      threeMonths: new Date(
         threeMonthsDate.setMonth(threeMonthsDate.getMonth() + 3)
      ).toISOString(),
      sixMonths: new Date(
         sixMonthsDate.setMonth(sixMonthsDate.getMonth() + 6)
      ).toISOString(),
      oneYear: new Date(
         oneYearDate.setFullYear(oneYearDate.getFullYear() + 1)
      ).toISOString(),
   };
}
