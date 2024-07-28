document.addEventListener("DOMContentLoaded", function () {
  // declaration of variables
  let Form = document.querySelector("form");
  let Tasks = document.querySelector("#tasks");
  let Input = document.querySelector("#task-input");

  // By default, add button is disabled
  let addBtn = document.querySelector("#add-btn");
  addBtn.disabled = true;

  Input.onkeyup = () => {
    addBtn.disabled = Input.value.length === 0;
  };

  Form.onsubmit = function (e) {
    e.preventDefault(); // Prevent default form submission
    const task = Input.value;
    addTask(task);

    Input.value = "";
    addBtn.disabled = true;

    // stop form from submitting
    return false;
  };

  const addTask = (task) => {
    const Li = document.createElement("li");
    Li.innerHTML = `<i class="fa-regular fa-circle"></i><span>${task}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-solid fa-trash" style="color: #1c7ed6"></i>`;
    //   Tasks.appendChild(Li);
    Tasks.prepend(Li); // Prepend the new task to the list

    // Add event listener to complete/uncomplete
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

  const completeTask = (Li, complete) => {
    if (Li.style.textDecoration === "line-through") {
      Li.style.textDecoration = "none";
      complete.classList.add("fa-circle");
      complete.classList.remove("fa-circle-check");
    } else {
      Li.style.textDecoration = "line-through";
      complete.classList.remove("fa-circle");
      complete.classList.add("fa-circle-check");
    }
    saveTasksToLocalStorage();
  };

  const deleteTask = (event) => {
    const del = event.target.parentElement;
    Tasks.removeChild(del);
    saveTasksToLocalStorage();
  };

  const editTask = (Li, editBtn) => {
    const currentText = Li.querySelector("span").innerText;
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    Li.querySelector("span").replaceWith(editInput);

    // Replace the edit icon with a save icon
    editBtn.classList.remove("fa-pen-to-square");
    editBtn.classList.add("fa-floppy-disk");

    // Save the edited text
    editBtn.addEventListener("click", function saveEdit() {
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
    });
  };

  const saveTasksToLocalStorage = () => {
    const storeTasks = [];
    const taskItems = Tasks.querySelectorAll("li");
    taskItems.forEach((taskItem) => {
      const taskText = taskItem.querySelector("span").innerText;
      const completed = taskItem.style.textDecoration === "line-through";
      storeTasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem("storeTasks", JSON.stringify(storeTasks));
    console.log("Tasks saved to localStorage:", JSON.stringify(storeTasks)); // Debug log
  };

  const loadTasks = () => {
    const storeTasks = JSON.parse(localStorage.getItem("storeTasks")) || [];
    console.log("Tasks loaded from localStorage:", storeTasks); // Debug log
    storeTasks.forEach((task) => {
      addTask(task.text);
      if (task.completed) {
        const li = Tasks.querySelector("li:first-child");
        const complete = li.querySelector(".fa-circle");
        completeTask(li, complete);
      }
    });
  };

  loadTasks();
});
