document.addEventListener("DOMContentLoaded", () => {
    let addButton = document.getElementById("add");
    addButton.addEventListener("click", addTask);
    loadTasks();

    let dateInput = document.getElementById("calendar");
    if (dateInput) {
        dateInput.addEventListener("change", function() {
            filterTasksByDate(dateInput.value);
        });
    }
});

function addTask() {
    let todoText = document.getElementById("iText").value;
    let date = document.getElementById("calendar").value;

    if (todoText.trim() === "") {
        alert("Please enter a todo item");
        return;
    }

    // Generate a unique ID for each task
    let taskId = new Date().getTime().toString();

    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.dataset.id = taskId; // Store the unique ID in the element
    todoItem.dataset.date = date; // Store the date associated with the task

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

    let trashButton = document.createElement("button");
    trashButton.textContent = "❌";
    trashButton.style.border = "None";
    trashButton.addEventListener("click", function() {
        todoItem.style.display = "none"; // Hide the item instead of removing
        updateLocalStorage();
    });

    let todoTextElement = document.createElement("p");
    todoTextElement.textContent = todoText;
    todoTextElement.classList.add("todo-text");

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(trashButton);

    document.getElementById("todoContainer").appendChild(todoItem);

    document.getElementById("iText").value = "";

    saveTask(taskId, todoText, checkbox.checked, date); 
}

function saveTask(id, text, completed, date) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id); // Remove any existing task with the same ID
    tasks.push({ id: id, text: text, completed: completed, date: date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTodoItem(task.id, task.text, task.completed, task.date);
    });
}

function createTodoItem(id, text, completed, date) {
    let todoContainer = document.getElementById("todoContainer");

    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.dataset.id = id; // Store the unique ID in the element
    todoItem.dataset.date = date; // Store the date associated with the task

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = completed;
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
        todoItem.style.display = "none"; // Hide the item instead of removing
        updateLocalStorage();
    });

    let todoTextElement = document.createElement("p");
    todoTextElement.textContent = text;
    todoTextElement.classList.add("todo-text");
    if (completed) {
        todoTextElement.classList.add("completed");
    }

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoTextElement);
    todoItem.appendChild(trashButton);

    todoContainer.appendChild(todoItem);
}

function filterTasksByDate(date) {
    let todoContainer = document.getElementById("todoContainer");

    Array.from(todoContainer.childNodes).forEach(child => {
        if (child.classList && child.classList.contains('todo-item')) {
            if (child.dataset.date !== date && date !== '') {
                child.style.display = "none"; // Hide tasks not matching the date
            } else {
                child.style.display = ""; // Show tasks matching the date
            }
        }
    });

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let hasVisibleTasks = tasks.some(task => task.date === date || date === '');

    let existingMessage = document.querySelector('.no-tasks-message');
    if (!hasVisibleTasks && date) {
        if (!existingMessage) {
            let noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = 'No tasks for the selected date.';
            noTasksMessage.classList.add('no-tasks-message');
            todoContainer.appendChild(noTasksMessage);
        }
    } else if (existingMessage) {
        existingMessage.remove();
    }
}

function updateLocalStorage() {
    let todoItems = document.querySelectorAll(".todo-item");
    let tasks = [];
    todoItems.forEach(item => {
        let id = item.dataset.id;
        let text = item.querySelector(".todo-text").textContent;
        let completed = item.querySelector(".todo-checkbox").checked;
        let date = item.dataset.date;

        tasks.push({ id: id, text: text, completed: completed, date: date });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
