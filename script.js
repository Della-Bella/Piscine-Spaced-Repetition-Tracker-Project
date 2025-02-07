// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, addData } from "./storage.js";
import { calculateRevisionDates } from "./dates.js";
import { displayAgenda } from "./display.js";

const userSelect = document.getElementById("userSelect");
const scheduleBody = document.getElementById("schedule-body");
const form = document.getElementById("topicForm");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById("taskDate");

// Function to set default date in the date input field
document.addEventListener("DOMContentLoaded", () => {
   const today = new Date();
   const yyyy = today.getFullYear();
   const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
   const dd = String(today.getDate()).padStart(2, '0');

   // Set the default date in the input field
   taskDateInput.value = `${yyyy}-${mm}-${dd}`;
});

// Populate the dropdown with user options
const userIds = getUserIds();
console.log("Loaded Users", userIds);

// Add a default option (No user selected initially)
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "-- Select a User --";
defaultOption.disabled = true;
defaultOption.selected = true;
userSelect.appendChild(defaultOption);

userIds.forEach((userId) => {
   const option = document.createElement("option");
   option.value = userId;
   option.textContent = `User ${userId}`;
   userSelect.appendChild(option);
});

// Display a placeholder message instead of an agenda at first
scheduleBody.innerHTML = `
   <tr>
      <td colspan="7" style="text-align: center;">Please select a user to see the agenda.</td>
   </tr>
`;

// Listen for user selection and update the agenda
userSelect.addEventListener("change", (event) => {
   const selectedUserId = event.target.value;
   if (selectedUserId) {
      displayAgenda(selectedUserId);
   }
});

// Handle form submission
form.addEventListener("submit", (event) => {
   event.preventDefault(); // Prevent page reload
   const selectedUserId = userSelect.value;
   const taskName = taskNameInput.value;
   const taskDate = taskDateInput.value;

   if (!selectedUserId) {
      alert("Please select a user before adding a task.");
      return;
   }

   if (!taskName || !taskDate) {
      alert("Please enter both a topic name and a date.");
      return;
   }

   // Calculate revision dates
   const revisionDates = calculateRevisionDates(taskDate);
   const newTask = {
      name: taskName,
      ...revisionDates,
   };

   // Store the new task for the selected user
   addData(selectedUserId, [newTask]);

   // Update the agenda to show the new task
   displayAgenda(selectedUserId);

   // Clear the input fields after submission
   taskNameInput.value = "";
   taskDateInput.value = "";
});
