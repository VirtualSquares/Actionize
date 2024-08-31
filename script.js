document.addEventListener("DOMContentLoaded", loadTasks);

let addButton = document.getElementById("add");
addButton.addEventListener("click", addTask);

function addTask() {
    let todoText = document.getElementById("iText").value;
    let todoContainer = document.getElementById("todoContainer");

    if (todoText.trim() === "") {
        alert("Please enter a todo item");
        return;
    }

    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // Create and style the checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo";
    checkbox.classList.add("todo-checkbox");
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            todoTextElement.classList.add("completed");
        } else {
            todoTextElement.classList.remove("completed");
        }
        updateLocalStorage();
    });

    // Create and style the trash button
    let trashButton = document.createElement("button");
    trashButton.textContent = "❌";
    trashButton.style.border = "None";
    trashButton.addEventListener("click", function() {
        todoContainer.removeChild(todoItem);
        updateLocalStorage();
    });

    let todoTextElement = document.createElement("p");
    todoTextElement.textContent = todoText;
    todoTextElement.classList.add("todo-text");

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(trashButton);

    todoContainer.appendChild(todoItem);

    document.getElementById("iText").value = "";

    saveTask(todoText, checkbox.checked);
}

function saveTask(todoText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: todoText, completed: completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let todoContainer = document.getElementById("todoContainer");

        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "todo";
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                todoTextElement.classList.add("completed");
            } else {
                todoTextElement.classList.remove("completed");
            }
            updateLocalStorage();
        });

        let trashButton = document.createElement("button");
        trashButton.textContent = "❌";
        trashButton.style.border = "None";
        trashButton.addEventListener("click", function() {
            todoContainer.removeChild(todoItem);
            updateLocalStorage();
        });

        let todoTextElement = document.createElement("p");
        todoTextElement.textContent = task.text;
        todoTextElement.classList.add("todo-text");
        if (task.completed) {
            todoTextElement.classList.add("completed");
        }

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTextElement);
        todoItem.appendChild(trashButton);

        todoContainer.appendChild(todoItem);
    });
}

function updateLocalStorage() {
    let todoItems = document.querySelectorAll(".todo-item");
    let tasks = [];
    todoItems.forEach(item => {
        let text = item.querySelector(".todo-text").textContent;
        let completed = item.querySelector(".todo-checkbox").checked;
        tasks.push({ text: text, completed: completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
