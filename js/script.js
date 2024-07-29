document.addEventListener("DOMContentLoaded", function () {
  // declaration of variables Form, task list, Input and addBtn elements
  let Form = document.querySelector("form");
  let Tasks = document.querySelector("#tasks");
  let Input = document.querySelector("#task-input");
  let addBtn = document.querySelector("#add-btn");

  // Disable add button initially
  addBtn.disabled = true;

  // disabled add button when input is not empty
  Input.addEventListener("keyup", () => {
    if (Input.value.length > 0) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  });

  // Handle form submission
  Form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    const task = Input.value;
    addTask(task);

    Input.value = "";

    addBtn.disabled = true;
  });

  // Add task
  const addTask = (task) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <i class="fa-regular fa-circle complete"></i>
    <span>${task}</span>
    <i class="fa-solid fa-pen-to-square edit"></i>
    <i class="fa-solid fa-trash delete"></i>
  `;
    //   Tasks.appendChild(Li);
    Tasks.prepend(li); // Prepend the new task to the list

    attachEventListeners(li);

    saveData();
  };

  // Attach event listeners to a task item
  const attachEventListeners = (li) => {
    li.querySelector(".complete").addEventListener("click", () =>
      completeTask(li)
    );
    li.querySelector(".delete").addEventListener("click", () => deleteTask(li));
    li.querySelector(".edit").addEventListener("click", () => editTask(li));
  };

  // Handle task completion
  const completeTask = (li) => {
    const completeTaskText = li.querySelector("span");
    completeTaskText.classList.toggle("completed");
    const completeIcon = li.querySelector(".complete");
    completeIcon.classList.toggle("fa-circle");
    completeIcon.classList.toggle("fa-circle-check");
    if (completeTaskText.classList.contains("completed")) {
      completeTaskText.style.color = "#ccc";
      completeTaskText.style.textDecoration = "line-through";
    } else {
      completeTaskText.style.color = "#fff";
      completeTaskText.style.textDecoration = "none";
    }
    saveData();
  };

  // Handle task deletion
  const deleteTask = (li) => {
    li.remove();
    saveData();
  };

  // Handle task editing
  const editTask = (li) => {
    const editTaskText = li.querySelector("span");
    if (editTaskText.classList.contains("completed")) return;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = editTaskText.textContent;
    editTaskText.replaceWith(editInput);

    // Replace the edit icon with a save icon
    const editIcon = li.querySelector(".edit");
    editIcon.classList.toggle("fa-pen-to-square");
    editIcon.classList.toggle("fa-floppy-disk");

    // Save the edited text
    const saveEdit = () => {
      const newText = editInput.value;
      if (newText) {
        const newSpan = document.createElement("span");
        newSpan.textContent = newText;
        editInput.replaceWith(newSpan);

        // Restore the edit icon
        editIcon.classList.toggle("fa-floppy-disk");
        editIcon.classList.toggle("fa-pen-to-square");

        attachEventListeners(li); // Reattach event listeners to the new span

        saveData();
      }
    };

    editIcon.addEventListener("click", saveEdit, { once: true });
  };

  // Save data to local storage
  const saveData = () => {
    //this is the medthod signature ==> localStorage.setItem(key, value)
    localStorage.setItem("Tasks", Tasks.innerHTML);
  };

  // Load data from local storage
  const loadData = () => {
    const savedTasks = localStorage.getItem("Tasks");
    if (savedTasks) {
      Tasks.innerHTML = savedTasks;
      Tasks.querySelectorAll("li").forEach((li) => attachEventListeners(li));
    }
  };

  // call loadData to Load data from local storage
  loadData();
});
