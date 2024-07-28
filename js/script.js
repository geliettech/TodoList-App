document.addEventListener("DOMContentLoaded", function () {
  let Form = document.querySelector("form");
  let Tasks = document.querySelector("#tasks");
  let Input = document.querySelector("#task-input");

  let addBtn = document.querySelector("#add-btn");
  addBtn.disabled = true;

  Input.onkeyup = () => {
    addBtn.disabled = Input.value.length === 0;
  };

  Form.onsubmit = function (e) {
    e.preventDefault();
    const task = Input.value;
    addTask(task);
    Input.value = "";
    addBtn.disabled = true;
  };

  const addTask = (task) => {
    const Li = document.createElement("li");
    Li.innerHTML = `<i class="fa-regular fa-circle"></i><span>${task}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-solid fa-trash" style="color: #1c7ed6"></i>`;
    Tasks.prepend(Li);

    let complete = Li.querySelector(".fa-circle");
    complete.addEventListener("click", () => completeTask(Li, complete));

    let deleteBtn = Li.querySelector(".fa-trash");
    deleteBtn.addEventListener("click", () => deleteTask(Li));

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

  const deleteTask = (Li) => {
    Tasks.removeChild(Li);
    saveTasksToLocalStorage();
  };

  const editTask = (Li, editBtn) => {
    const currentText = Li.querySelector("span").innerText;
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    Li.querySelector("span").replaceWith(editInput);

    editBtn.classList.remove("fa-pen-to-square");
    editBtn.classList.add("fa-floppy-disk");

    const saveEdit = () => {
      let newText = editInput.value;
      const newSpan = document.createElement("span");
      newSpan.textContent = newText;
      editInput.replaceWith(newSpan);

      editBtn.classList.remove("fa-floppy-disk");
      editBtn.classList.add("fa-pen-to-square");

      editBtn.removeEventListener("click", saveEdit);
      saveTasksToLocalStorage();
    };

    editBtn.addEventListener("click", saveEdit);
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
  };

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
