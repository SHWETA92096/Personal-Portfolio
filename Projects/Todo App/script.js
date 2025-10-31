const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearAllBtn = document.getElementById("clear-all");

// Load tasks from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Add task
addBtn.addEventListener("click", addTask);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const newTodo = { text: taskText, completed: false };
  todos.push(newTodo);
  saveAndRender();
  todoInput.value = "";
}

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  let filteredTodos = todos;
  if (filter === "active") filteredTodos = todos.filter(t => !t.completed);
  if (filter === "completed") filteredTodos = todos.filter(t => t.completed);

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", todo.completed);
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    // Toggle complete
    li.querySelector("span").addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveAndRender(filter);
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      todos.splice(index, 1);
      saveAndRender(filter);
    });

    todoList.appendChild(li);
  });
}

function saveAndRender(filter = "all") {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(filter);
}

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTodos(btn.dataset.filter);
  });
});

// Clear all
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    todos = [];
    saveAndRender();
  }
});

