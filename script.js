// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// import { getUserIds } from "./storage.js";

// window.onload = function () {
//   const users = getUserIds();
//   document.querySelector("body").innerText = `There are ${users.length} users`;
// };

import { getUserIds, addData } from "./storage.js";
import { calculateRevisionDates } from "./dates.js";
import { displayAgenda } from "./display.js";

const userSelect = document.getElementById("userSelect");
const scheduleBody = document.getElementById("schedule-body");
const form = document.getElementById("topicForm");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById("taskDate");


document.getElementById("userSelect");

// Populate the dropdown with user options
const userIds = getUserIds();
//  Check is the user IDs are loading
console.log("Loaded Users", userIds);
userIds.forEach((userId) => {
   const option = document.createElement("option");
   option.value = userId;
   option.textContent = `User ${userId}`;
   userSelect.appendChild(option);
});

// Handle form submission
form.addEventListener("submit", (event) => {
   event.preventDefault(); // Prevent page reload
   const selectedUserId = userSelect.value;
   const taskName = taskNameInput.value;
   const taskDate = taskDateInput.value;
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

// Listen for user selection and update the agenda
userSelect.addEventListener("change", (event) => {
   const selectedUserId = event.target.value;
   displayAgenda(selectedUserId);
});

// Display agenda for the first user on page load
if (userIds.length > 0) {
   displayAgenda(userIds[0]); // Load first user’s agenda initially
}
