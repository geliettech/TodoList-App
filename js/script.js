document.addEventListener("DOMContentLoaded", function () {
  
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
    Li.innerHTML = `<input type="checkbox" name="" id=""><span>${Input.value}</span><button class="edit-btn">edit</button><button class="delete-btn">Delete</button>`;

    Tasks.appendChild(Li);

    Input.value = "";

    addBtn.disabled = true;

    // Add event listener to delete button
    let deleteBtn = Li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      Li.remove();
    });
    // stop form from submitting
    return false;
  };
});
