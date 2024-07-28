document.addEventListener("DOMContentLoaded", function () {
  // declaration of variables Form, task list, and Input elements
  let Form = document.querySelector("form");
  let Tasks = document.querySelector("#tasks");
  let Input = document.querySelector("#task-input");

  // By default, add button is disabled
  let addBtn = document.querySelector("#add-btn");
  addBtn.disabled = true;

  // disabled add button when input is not empty
  Input.onkeyup = () => {
    if (Input.value.length > 0) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  };

  // Handle form submission
  Form.onsubmit = function (e) {
    e.preventDefault(); // Prevent page reload
    const task = Input.value;
    addTask(task);

    Input.value = "";

    addBtn.disabled = true;

    // stop form from submitting
    return false;
  };

  // Handle Task Addition and Display
  const addTask = (task) => {
    const Li = document.createElement("li");
    Li.innerHTML = `<i class="fa-regular fa-circle"></i><span>${task}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-solid fa-trash"></i>`;

    //   Tasks.appendChild(Li);
    Tasks.prepend(Li); // Prepend the new task to the list

    // Add event listener to Handle Task Completion
    let complete = Li.querySelector(".fa-circle");
    complete.addEventListener("click", () => completeTask(Li, complete));

    // Add event listener to delete button
    let deleteBtn = Li.querySelector(".fa-trash");
    deleteBtn.addEventListener("click", deleteTask);

    // Add event listener to edit button
    let editBtn = Li.querySelector(".fa-pen-to-square");
    editBtn.addEventListener("click", () => editTask(Li, editBtn));

    saveTasksToLocalStorage();
  };

  // mark task as Complete or uncomplete
  const completeTask = (Li, complete) => {
    const taskText = Li.querySelector("span");
    const editBtn = Li.querySelector(".fa-pen-to-square");
    const saveBtn = Li.querySelector(".fa-floppy-disk");
    if (taskText.style.textDecoration === "line-through") {
      taskText.style.textDecoration = "none";
      complete.classList.add("fa-circle");
      complete.classList.remove("fa-circle-check");
      taskText.style.color = "#fff";
      editBtn.style.color = "#1c7ed6"; // Restore original color when unmarked
      saveBtn.styl.color = "#4caf50";
    } else {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#ccc";
      complete.classList.remove("fa-circle");
      complete.classList.add("fa-circle-check");
      editBtn.style.color = "#ccc"; // Change color when marked as complete
    }
    saveTasksToLocalStorage();
  };

  // Delete a task
  const deleteTask = (event) => {
    // const del = event.target.parentElement;
    const del = event.target.closest("li");
    Tasks.removeChild(del);
    saveTasksToLocalStorage();
  };

  // Edit a task
  const editTask = (Li, editBtn) => {
    const taskText = Li.querySelector("span");
    if (taskText.style.textDecoration === "line-through") {
      // Prevent editing if the task is marked as complete
      return;
    }
    const currentText = taskText.innerText;
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    Li.querySelector("span").replaceWith(editInput);

    // Replace the edit icon with a save icon
    editBtn.classList.remove("fa-pen-to-square");
    editBtn.classList.add("fa-floppy-disk");

    // Save the edited text
    const saveEdit = () => {
      let newText = editInput.value;
      const newSpan = document.createElement("span");
      newSpan.textContent = newText;
      editInput.replaceWith(newSpan);

      // Restore the edit icon
      editBtn.classList.remove("fa-floppy-disk");
      editBtn.classList.add("fa-pen-to-square");

      // Remove the save event listener to avoid adding multiple listeners
      editBtn.removeEventListener("click", saveEdit);
      saveTasksToLocalStorage();
    };

    editBtn.addEventListener("click", saveEdit);
  };

  // Store Tasks to Local Storage
  const saveTasksToLocalStorage = () => {
    const storeTasks = [];
    const taskItems = Tasks.querySelectorAll("li");
    taskItems.forEach((taskItem) => {
      const taskText = taskItem.querySelector("span").innerText;
      const completed = taskItem.style.textDecoration === "line-through";
      storeTasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem("storeTasks", JSON.stringify(storeTasks));
  };

  // Load tasks from local storage
  const loadTasksToLocalStorage = () => {
    const storeTasks = JSON.parse(localStorage.getItem("storeTasks")) || [];
    storeTasks.forEach((task) => {
      addTask(task.text);
      if (task.completed) {
        const li = Tasks.querySelector("li:first-child");
        const complete = li.querySelector(".fa-circle");
        completeTask(li, complete);
      }
    });
  };

  loadTasksToLocalStorage();
});
