document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const board = document.getElementById("board");
  const close = document.querySelector(".close");
  const btn = document.getElementById("btn");
  const courseRows = document.getElementById("course-rows");
  const calculateBtn = document.querySelector("#calculate-btn");
  const calculatedTable = document.querySelector(".calculated");
  const errorMessage = document.querySelector(".error-message");

  let courseCount = 0;
  // const printBtn = document.querySelector(".print a");

  // Toggle menu visibility
  menu.addEventListener("click", () => {
    board.classList.remove("-translate-y-full");
    board.classList.add("translate-y-0");
  });

  // Hide menu on close
  close.addEventListener("click", () => {
    board.classList.remove("translate-y-0");
    board.classList.add("-translate-y-full");
  });

  // Add a new course row
  function addRow() {
    courseCount++;
    const newRow = document.createElement("tr");
    newRow.classList.add("border-b", "border-[#F5F5F5]");

    newRow.innerHTML = `
      <td class="text-center text-[#152D58] font-semibold">${courseCount}</td>
      <td><input type="text" class="px-2 py-1 border rounded w-full" /></td>
      <td><input type="number" class="px-2 py-1 border rounded w-full" /></td>
      <td><select class="border border-gray-300 w-full">
          <option value="4">A</option>
          <option value="3">B</option>
          <option value="2">C</option>
          <option value="1">D</option>
          <option value="0">F</option>
      </select></td>
      <td><button class="remove-btn text-red-500"><i class="fa-solid fa-xmark" style="color: #152d58;"></i></button></td>
    `;

    courseRows.appendChild(newRow);

    // Add event listener to the remove button
    newRow.querySelector(".remove-btn").addEventListener("click", () => {
      courseRows.removeChild(newRow);
      courseCount--;
      updateRowNumbers();
    });

    updateRowNumbers();
  }

  // Update the course numbers after a row is removed
  function updateRowNumbers() {
    const rows = document.querySelectorAll("#course-rows tr");
    rows.forEach((row, index) => {
      row.querySelector("td:first-child").textContent = index + 1;
    });
  }

  // Calculate grade points and show results
  calculateBtn.addEventListener("click", () => {
    const courseData = [];
    const gradeMap = { 4: "A", 3: "B", 2: "C", 1: "D", 0: "F" };
    const courseRows = document.querySelectorAll("#course-rows tr");
    let isValid = true; // Flag to check if the input is valid
    let totalCredits = 0; // To store the total credits
    let totalGradePoints = 0; // To store the total grade points

    // Clear any previous error messages
    errorMessage.textContent = "";

    courseRows.forEach((row) => {
      const courseTitle = row
        .querySelector("td:nth-child(2) input")
        .value.trim();
      const credits = parseFloat(
        row.querySelector("td:nth-child(3) input").value
      );
      const gradeValue = parseInt(
        row.querySelector("td:nth-child(4) select").value
      );

      // Check if course title is not empty and credits is a valid positive number
      if (!courseTitle || isNaN(credits) || credits <= 0) {
        isValid = false;
      }

      // Only add valid course data
      if (courseTitle && !isNaN(credits) && credits > 0 && gradeValue != null) {
        const grade = gradeMap[gradeValue];
        const gradePoint = (credits * gradeValue).toFixed(2);

        courseData.push({
          title: courseTitle,
          credits: credits,
          grade: grade,
          gradeValue: gradeValue,
          gradePoint: gradePoint,
        });

        // Add credits to totalCredits and grade points to totalGradePoints
        totalCredits += credits;
        totalGradePoints += credits * gradeValue;
      }
    });

    // If input is invalid, show error message and stop calculation
    if (!isValid) {
      errorMessage.textContent =
        "Please ensure all fields are filled in correctly (Course Title and Credits).";

      return;
    }

    // Clear previous data in the calculated table
    const tbody = calculatedTable.querySelector("tbody");
    tbody.innerHTML = "";

    // Populate the calculated table
    courseData.forEach((course) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${course.title}</td>
        <td class="border border-gray-300 px-4 py-2">${course.credits}</td>
        <td class="border border-gray-300 px-4 py-2">${course.grade}</td>
        <td class="border border-gray-300 px-4 py-2">
          ${course.credits} * ${course.gradeValue} = ${course.gradePoint}
        </td>
      `;
      tbody.appendChild(row);
    });

    // Add a row for the total credits, spanning two columns
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td colspan="3" class="border border-gray-300 px-4 py-2 text-right font-bold text-[#152D58]">Total Credits</td>
      <td class="border border-gray-300 px-4 py-2">${totalCredits}</td>
    `;
    tbody.appendChild(totalRow);

    // Calculate GPA if totalCredits is greater than 0
    let GPA = 0;
    if (totalCredits > 0) {
      GPA = (totalGradePoints / totalCredits).toFixed(2);
    }

    // Add a row for the GPA
    const gpaRow = document.createElement("tr");
    gpaRow.innerHTML = `
      <td colspan="3" class="border border-gray-300 px-4 py-2 text-right font-bold text-[#152D58]">GPA</td>
      <td class="border border-gray-300 px-4 py-2">${GPA}</td>
    `;
    tbody.appendChild(gpaRow);

    // Show the calculated table
    calculatedTable.classList.remove("hidden");
  });

  // printBtn.addEventListener("click", (e) => {
  //   e.preventDefault(); // Prevent the default link action

  //   const { jsPDF } = window.jspdf;
  //   const doc = new jsPDF();

  //   // Wait until the table is rendered
  //   const table = document.querySelector(".calculated table");
  //   const tableHtml = table.outerHTML;

  //   // Add the table to the PDF
  //   doc.html(tableHtml, {
  //     callback: function (doc) {
  //       doc.save("gpa-table.pdf"); // Save the PDF with a custom filename
  //     },
  //     x: 10,
  //     y: 10,
  //   });
  // });

  // Add 5 rows by default on page load
  for (let i = 0; i < 1; i++) {
    addRow();
  }

  // Add event listener to the "Add Row" button
  btn.addEventListener("click", addRow);
});
