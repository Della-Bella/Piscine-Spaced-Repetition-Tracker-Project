import { getData } from "./storage.js";

// Function to display the agenda for the user selected
export function displayAgenda(userId) {
   const scheduleBody = document.getElementById("schedule-body");

   scheduleBody.innerHTML = ""; // Clear previous content

   const agenda = getData(userId); // Fetch agenda for selected user

   if (!agenda || agenda.length === 0) {
      // No agenda, show a message
      scheduleBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center;">No agenda found for this user.</td>
      </tr>
    `;

      return;
   }

   // If agenda exists, display it in the table
   agenda.forEach((topic) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${topic.name}</td>
      <td>${new Date(topic.startDate).toLocaleDateString()}</td>
      <td>${new Date(topic.oneWeek).toLocaleDateString()}</td>
      <td>${new Date(topic.oneMonth).toLocaleDateString()}</td>
      <td>${new Date(topic.threeMonths).toLocaleDateString()}</td>
      <td>${new Date(topic.sixMonths).toLocaleDateString()}</td>
      <td>${new Date(topic.oneYear).toLocaleDateString()}</td>
    `;
      scheduleBody.appendChild(row);
   });
}
