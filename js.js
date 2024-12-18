const menu = document.querySelector(".menu");
const board = document.getElementById("board");
const close = document.querySelector(".close");

// Toggle the visibility of the board when the menu icon is clicked
menu.addEventListener("click", () => {
  board.classList.toggle("hidden");
});

// Hide the board when the close icon is clicked
close.addEventListener("click", () => {
  board.classList.add("hidden");
});

// button add
let courseCount = 0;

function addRow() {
  courseCount++; // Increment the counter each time a new row is added
  const tableBody = document.getElementById("course-rows");

  // Create a new row with table cells for the course number, course name, credits, and grade
  const newRow = document.createElement("tr");
  newRow.classList.add("border-b", "border-[#F5F5F5]");

  // Add the course number and input fields for the other columns
  newRow.innerHTML = `
      <td class="text-center text-[#152D58] font-semibold">${courseCount}</td>
      <td><input type="text" class="px-2 py-1 border rounded w-full" placeholder:text-[10px]  /></td>
      <td><input type="number" class="px-2 py-1 border rounded w-full"  /></td>
      <td><input type="text" class="px-2 py-1 border rounded w-full"  /></td>
    `;

  // Append the new row to the table body
  tableBody.appendChild(newRow);
}
