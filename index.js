
const add_button_el = document.getElementById("add-button");
const list_el = document.getElementById("incomplete-tasks");

// let todoList = [];

// add_button_el.addEventListener('click', add_task);

// function add_task() {
//     const item = {
//         id: new Date().getTime(),
//         text: "",
//         // complete: false,
//     }
//     todoList.unshift(item);

//     const {task_el, input_el} = createTodoElement(item);

//     list_el.prepend(task_el);

//     input_el.removeAttribute("disabled")
//     input_el.focus();

//     save();
// }
// function createTodoElement(item) {
//     const task_el = document.createElement("div");
//     task_el.classList.add("task");

//     const input_el = document.createElement("input");
//     input_el.classList.add("new-task-input");
//     input_el.type = "text";
//     input_el.value = item.text;
//     input_el.setAttribute("disabled", "");
//     // if (!input_el.value) {
//     //     alert("Please Fill the your task");
//     //     return;
//     // }

//     const actions_el = document.createElement("div");
//     actions_el.classList.add("actions");

//     const edit_btn_el = document.createElement("button");
//     edit_btn_el.classList.add("edit-button");
//     edit_btn_el.innerText = "Edit";

//     const delete_btn_el = document.createElement("button");
//     delete_btn_el.classList.add("delete-button");
//     delete_btn_el.innerText = "Delete";

//     actions_el.append(edit_btn_el);
//     actions_el.append(delete_btn_el);

//     task_el.append(input_el);
//     task_el.append(actions_el);


//     input_el.addEventListener('input', () => {
//         item.text = input_el.value;
//     });

//     input_el.addEventListener('blur',() => {
//         item.text = input_el;
//         input_el.setAttribute("disabled", "");
//         save();
//     });

//     edit_btn_el.addEventListener('click', () => {
//         input_el.removeAttribute("disabled")
//         input_el.focus();
//     });

//     delete_btn_el.addEventListener('click', () => {
//         todoList = todoList.filter(t => t.id != item.id);
//         task_el.remove();
//         save();
//     });
//         return (task_el, input_el, edit_btn_el, delete_btn_el);
    
// }


// function displayTodoList() {
//     load();
//     for (let i = 0; i < todoList.length; i++) {
//         const item = todoList[i];
//         const { task_el } = createTodoElement(item);
//         list_el.append(task_el);
//     }
// }
// displayTodoList();

// function save() {
//         const save = JSON.stringify(todoList);
//         localStorage.setItem("my_todos",save);
//     }
    
//     function load() {
//         const data = localStorage.getItem("my_todos");
//         if(data){
//             todoList  = JSON.parse(data);
//         }
//     }