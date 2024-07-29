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
    }else{
      completeTaskText.style.color = "#fff";
      completeTaskText.style.textDecoration = "none";
    };
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

 // Initialize task list
  loadData();

  // Handle Task Addition and Display
  // const addTask = (task) => {
  //   const Li = document.createElement("li");
  //   Li.innerHTML = `<i class="fa-regular fa-circle"></i><span>${task}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-solid fa-trash"></i>`;

  //   //   Tasks.appendChild(Li);
  //   Tasks.prepend(Li); // Prepend the new task to the list

  //   // Add event listener to Handle Task Completion
  //   let complete = Li.querySelector(".fa-circle");
  //   complete.addEventListener("click", () => completeTask(Li, complete));

  //   // Add event listener to delete button
  //   let deleteBtn = Li.querySelector(".fa-trash");
  //   deleteBtn.addEventListener("click", () => deleteTask(Li));

  //   // Add event listener to edit button
  //   let editBtn = Li.querySelector(".fa-pen-to-square");
  //   editBtn.addEventListener("click", () => editTask(Li, editBtn));
  //   saveData();
  // };

  // mark task as Complete or uncomplete
  //   const completeTask = (Li, complete) => {
  //     const taskText = Li.querySelector("span");
  //     const editBtn = Li.querySelector(".fa-pen-to-square");
  //     const saveBtn = Li.querySelector(".fa-floppy-disk");
  //     if (taskText.style.textDecoration === "line-through") {
  //       taskText.style.textDecoration = "none";
  //       complete.classList.add("fa-circle");
  //       complete.classList.remove("fa-circle-check");
  //       taskText.style.color = "#fff";
  //       editBtn.style.color = "#1c7ed6"; // Restore original color when unmarked
  //       saveBtn.style.color = "#4caf50";
  //       saveData();
  //     } else {
  //       taskText.style.textDecoration = "line-through";
  //       taskText.style.color = "#ccc";
  //       complete.classList.remove("fa-circle");
  //       complete.classList.add("fa-circle-check");
  //       editBtn.style.color = "#ccc"; // Change color when marked as complete
  //     }
  //     saveData();
  //   };

  //   // Delete a task
  //   const deleteTask = (Li) => {
  //     Tasks.removeChild(Li);
  //     saveData();
  //   };

  //   // Edit a task
  //   const editTask = (Li, editBtn) => {
  //     const taskText = Li.querySelector("span");
  //     if (taskText.style.textDecoration === "line-through") {
  //       // Prevent editing if the task is marked as complete
  //       return;
  //     }
  //     const currentText = taskText.innerText;
  //     let editInput = document.createElement("input");
  //     editInput.type = "text";
  //     editInput.value = currentText;
  //     Li.querySelector("span").replaceWith(editInput);

  //     // Replace the edit icon with a save icon
  //     editBtn.classList.remove("fa-pen-to-square");
  //     editBtn.classList.add("fa-floppy-disk");

  //     // Save the edited text
  //     const saveEdit = () => {
  //       let newText = editInput.value;
  //       const newSpan = document.createElement("span");
  //       newSpan.textContent = newText;
  //       editInput.replaceWith(newSpan);

  //       // Restore the edit icon
  //       editBtn.classList.remove("fa-floppy-disk");
  //       editBtn.classList.add("fa-pen-to-square");

  //       // Remove the save event listener to avoid adding multiple listeners
  //       editBtn.removeEventListener("click", saveEdit);
  //     };

  //     editBtn.addEventListener("click", saveEdit);
  //   };

  //   //=====this function is used to save data in local storage.=====
  //   function saveData() {
  //     //this is the medthod signature ==> localStorage.setItem(key, value)
  //     localStorage.setItem("data", Tasks.innerHTML);
  //   }

  //   //-----------------------------------------------------------------------
  //   //====this function is used to get data from local storage.===
  //   function showList() {
  //     //this is the medthod signature ==> localStorage.getItem(key);
  //     //that data you need to set to listCOntainer. Then you can see your works
  //     Tasks.innerHTML = localStorage.getItem("data") || "";
  //     // Reattach event listeners to tasks loaded from local storage
  //     Tasks.querySelectorAll("li").forEach((Li) => {
  //       let complete = Li.querySelector(".fa-circle");
  //       complete.addEventListener("click", () => completeTask(Li, complete));

  //       let deleteBtn = Li.querySelector(".fa-trash");
  //       deleteBtn.addEventListener("click", () => deleteTask(Li));

  //       let editBtn = Li.querySelector(".fa-pen-to-square");
  //       editBtn.addEventListener("click", () => editTask(Li, editBtn));
  //     });
  //   }

  //   //you need to call to it
  //   showList();
});
