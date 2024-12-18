const menu = document.querySelector(".menu");
const board = document.getElementById("board");
const close = document.querySelector(".close");
const btn = document.getElementById("btn");
let courseCount = 0;

// Toggle
menu.addEventListener("click", () => {
  board.classList.toggle("hidden");
});

// Hide
close.addEventListener("click", () => {
  board.classList.add("hidden");
});

function addRow() {
  courseCount++;
  const tableBody = document.getElementById("course-rows");

  const newRow = document.createElement("tr");
  newRow.classList.add("border-b", "border-[#F5F5F5]");

  // Add the
  newRow.innerHTML = `
  <td class="text-center text-[#152D58] font-semibold">${courseCount}</td>
  <td><input type="text" class="px-2 py-1 border rounded w-full"  /></td>
  <td><input type="number" class="px-2 py-1 border rounded w-full"  /></td>
  <td><input type="text" class="px-2 py-1 border rounded w-full"  /></td>
  <td><button class="remove-btn text-red-500"><i class="fa-solid fa-xmark" style="color: #152d58;"></i></button></td>
`;

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Add event listener to the remove button
  newRow.querySelector(".remove-btn").addEventListener("click", () => {
    tableBody.removeChild(newRow);
    courseCount--;
    updateRowNumbers();
  });
}

// Update the course numbers after a row is removed
function updateRowNumbers() {
  const rows = document.querySelectorAll("#course-rows tr");
  let number = 1;
  rows.forEach((row) => {
    row.querySelector("td:first-child").textContent = number++;
  });
}

// Add 5 rows by default on page load
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 5; i++) {
    addRow();
  }
});

// Add event listener to the "Add Row" button
btn.addEventListener("click", addRow);
