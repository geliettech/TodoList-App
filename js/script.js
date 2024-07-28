document.addEventListener("DOMContentLoaded", function () {
  // declaration of variables
  let Form = document.querySelector("form");
  let Tasks = document.querySelector("#tasks");
  let Input = document.querySelector("#task-input");

  // By default, add button is disabled
  let addBtn = document.querySelector("#add-btn");
  addBtn.disabled = true;

  Input.onkeyup = () => {
    if (Input.value.length > 0) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  };

  Form.onsubmit = function (e) {
    e.preventDefault(); // Prevent default form submission

    const Li = document.createElement("li");
    Li.innerHTML = `<i class="fa-regular fa-circle"></i><span>${Input.value}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-solid fa-trash" style="color: #1c7ed6"></i>`;

    //   Tasks.appendChild(Li);
    Tasks.prepend(Li); // Prepend the new task to the list

    Input.value = "";

    addBtn.disabled = true;

    // Add event listener to complete/uncomplete
    let complete = Li.querySelector(".fa-circle");
    complete.addEventListener("click", function () {
      if (Li.style.textDecoration === "line-through") {
        Li.style.textDecoration = "none";
        complete.classList.add("fa-circle");
      } else {
        Li.style.textDecoration = "line-through";
        complete.classList.remove("fa-circle");
        complete.classList.add("fa-circle-check");
      }
    });

    // Add event listener to delete button
    let deleteBtn = Li.querySelector(".fa-trash");
    deleteBtn.addEventListener("click", function () {
      Li.remove();
    });

    // Add event listener to edit button
    let editBtn = Li.querySelector(".fa-pen-to-square");
    editBtn.addEventListener("click", function () {
      const currentText = Li.querySelector("span").innerText;
      editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = currentText;
      Li.querySelector("span").replaceWith(editInput);
      // Replace the edit icon with a save icon
      editBtn.classList.remove("fa-pen-to-square");
      editBtn.classList.remove("edit");
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
      });
    });

    // stop form from submitting
    return false;
  };
});
