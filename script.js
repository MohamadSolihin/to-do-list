document.addEventListener("DOMContentLoaded", function () {
  const listGroupItems = document.querySelectorAll(".list-group-item");
  const addTaskContainers = document.querySelectorAll(".add-task-container");

  const displaySections = {
    ".input-upcoming": "coming-cards",
    ".input-today": "today-cards",
    ".input-calendar": "calendar-cards",
    ".input-sticky": "sticky-cards",
  };

  function resetDisplay() {
    Object.values(displaySections).forEach(section => {
      document.getElementById(section).style.display = "none";
    });
  }

  function handleListGroupItemClick(item) {
    listGroupItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    resetDisplay();

    for (const [key, value] of Object.entries(displaySections)) {
      if (item.querySelector(key)) {
        const section = document.getElementById(value);
        section.style.display =
          section.style.display === "block" ? "none" : "block";
        break;
      }
    }
  }

  function handleAddTask(container) {
    const newTask = prompt("Enter new task:");
    if (newTask) {
      const taskDate = prompt("Enter task date (DD-MM-YYYY):");
      if (taskDate) {
        const taskElement = createTaskElement(newTask, taskDate);
        container.insertAdjacentElement("afterend", taskElement);
      } else {
        alert("Task date is required.");
      }
    }
  }

  function createTaskElement(taskName, taskDate) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("border-bottom", "ms-3", "pb-2", "mt-3");
    taskElement.innerHTML = `
      <i class="bi bi-app ms-4"></i>
      <span>${taskName}</span>
      <i class="bi bi-chevron-down float-end pe-3"></i>
      <div class="d-flex flex-row ms-3">
        <div class="p-2" id="input-calendar">
          <i class="bi bi-calendar2-x-fill me-2"></i>${taskDate}
        </div>
        <div class="p-2">
          <span class="badge bg-secondary me-2">1</span>Subtasks
        </div>
        <div class="p-2">
          <i class="bi bi-circle-fill text-primary mt-2 me-2"></i>Personal
        </div>
      </div>
    `;
    return taskElement;
  }

  listGroupItems.forEach(item => {
    item.addEventListener("click", () => handleListGroupItemClick(item));
  });

  addTaskContainers.forEach(container => {
    container.addEventListener("click", () => handleAddTask(container));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addTaskContainers = document.querySelectorAll(".add-task-container");

  function handleAddTaskButtonClick(
    inputSection,
    taskInput,
    dateInput,
    container
  ) {
    const newTask = taskInput.value.trim();
    const taskDate = dateInput.value.trim();

    if (newTask !== "" && taskDate !== "") {
      const taskElement = createTaskElement(newTask, taskDate);

      const parentContainer = container.closest("#coming-cards, #today-cards");
      if (parentContainer) {
        parentContainer
          .querySelector(".border.rounded-2.p-3")
          .appendChild(taskElement);
      }

      taskInput.value = "";
      dateInput.value = "";
      inputSection.style.display = "none";
    } else {
      alert("Please enter both task and task date.");
    }
  }

  addTaskContainers.forEach(container => {
    container.addEventListener("click", function () {
      const inputSection = container.querySelector(".input-section");
      inputSection.style.display = "flex";

      const taskInput = inputSection.querySelector(".task-input");
      const dateInput = inputSection.querySelector(".date-input");
      const addTaskBtn = inputSection.querySelector(".add-task-btn");

      addTaskBtn.addEventListener("click", () =>
        handleAddTaskButtonClick(inputSection, taskInput, dateInput, container)
      );
    });
  });
});

// aaa
document.addEventListener("DOMContentLoaded", () => {
  const calendarCards = document.getElementById("calendar-cards");
  const comingCards = document.getElementById("coming-cards");
  const todayCards = document.getElementById("today-cards");
  const inputCalendar = document.getElementById("input-calendar"); // Element to display selected date
  const days = calendarCards.querySelector(".days");

  // Function to set up the calendar with current month and year
  function setupCalendar() {
    const today = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    const firstDay = new Date(year, today.getMonth(), 1).getDay();
    const lastDate = new Date(year, today.getMonth() + 1, 0).getDate();

    // Set month and year
    calendarCards.querySelector(".month").textContent = `${month} ${year}`;

    // Clear previous days
    days.innerHTML = "";

    // Add empty cells for the days before the start of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "day";
      days.appendChild(emptyDiv);
    }

    // Add the days of the month
    for (let day = 1; day <= lastDate; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.textContent = day;
      dayDiv.addEventListener("click", () =>
        handleDayClick(day, today.getMonth(), year)
      );
      days.appendChild(dayDiv);

      // Check if this is today's date
      const currentDate = new Date();
      if (
        day === currentDate.getDate() &&
        today.getMonth() === currentDate.getMonth() &&
        year === currentDate.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }
    }
  }

  // Handle the day click event
  function handleDayClick(day, monthIndex, year) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthIndex];
    const taskDate = `${day} ${month} ${year}`;

    // Display the selected date in input-calendar
    if (inputCalendar) {
      inputCalendar.textContent = `Selected Date: ${taskDate}`;
    }

    const taskName = prompt(`Enter task for ${taskDate}:`);
    if (taskName) {
      // Create the task element using createTaskElement
      const taskElement = createTaskElement(taskName, taskDate);

      // Find the border element in coming-cards
      const borderElement = comingCards.querySelector(".border");

      if (borderElement) {
        // Insert the new task element inside the border element
        borderElement.insertAdjacentElement("beforeend", taskElement);
      } else {
        // If no border element exists, create a new one and append the task element
        const newBorderElement = document.createElement("div");
        newBorderElement.className = "border p-3"; // Ensure it matches the border style
        newBorderElement.appendChild(taskElement);
        comingCards.appendChild(newBorderElement);
      }
    }
  }

  // Function to create task element
  function createTaskElement(taskName, taskDate) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("border-bottom", "ms-3", "pb-2", "mt-3");
    taskElement.innerHTML = `
      <i class="bi bi-app ms-4"></i>
      <span>${taskName}</span>
      <i class="bi bi-chevron-down float-end pe-3"></i>
      <div class="d-flex flex-row ms-3">
        <div class="p-2" id="input-calendar">
          <i class="bi bi-calendar2-x-fill me-2"></i>${taskDate}
        </div>
        <div class="p-2">
          <span class="badge bg-secondary me-2">1</span>Subtasks
        </div>
        <div class="p-2">
          <i class="bi bi-circle-fill text-primary mt-2 me-2"></i>Personal
        </div>
      </div>
    `;
    return taskElement;
  }

  // Initialize calendar
  setupCalendar();
});
