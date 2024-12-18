const menu = document.querySelector(".menu");
const board = document.getElementById("board");
const close = document.querySelector(".close");
const btn = document.getElementById("btn");
console.log(btn);
// Toggle the visibility of the board when the menu icon is clicked
menu.addEventListener("click", () => {
  board.classList.toggle("hidden");
});

// Hide the board when the close icon is clicked
close.addEventListener("click", () => {
  board.classList.add("hidden");
});

let courseCount = 0;

function addRow() {
  courseCount++;
  const tableBody = document.getElementById("course-rows");

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
btn.addEventListener("click", addRow);
