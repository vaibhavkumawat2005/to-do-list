const todoin = document.getElementById("todo-input");
const add = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const saveTasks = () => { 
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


const taskRender = () => {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "Completed" : "";
    li.innerHTML = `
    <span>${task.text}</span>
    <div>
        <button class ="btncom" onclick = "toggleTask(${index})">${
      task.completed ? '<i class="fa-solid fa-arrow-rotate-left"></i>' : '<i class="fa-solid fa-circle-check"></i>'
    }</button>
        <button class="btndel" onclick="deleteTask(${index})"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    `;
    todoList.appendChild(li);
  });
};

add.addEventListener("click", () => {
  const taskText = todoin.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    taskRender();
    todoin.value = "";
  }
});

const toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  taskRender();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  taskRender();
};

taskRender();
