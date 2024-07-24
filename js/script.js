document.addEventListener("DOMContentLoaded", function () {
  // declaration of variables
  let Form = document.querySelector("form");
  let Tasks = document.querySelector("#tasks");
  let Task = document.querySelector("#task");

  // By default, submit button is disabled
  let Submit = document.querySelector("#submit");
  Submit.disabled = true;

  Task.onkeyup = () => {
    if (Task.value.length > 0) {
      Submit.disabled = false;
    } else {
      Submit.disabled = true;
    }
  };
  
  Form.onsubmit = function () {
    const TaskValue = Task.value;
    console.log(TaskValue);
    const li = document.createElement("li");
    li.innerHTML = TaskValue;

    Tasks.appendChild(li);

    Task.value = "";

    Submit.disabled = true;

    // stop form from submitting
    return false;
  };
});
