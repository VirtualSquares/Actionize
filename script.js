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
    let todoContainer = document.getElementById("todoContainer");
    let date = document.getElementById("calendar").value;

    console.log(date); 

    if (todoText.trim() === "") {
        alert("Please enter a todo item");
        return;
    }

    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

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

    saveTask(todoText, checkbox.checked, date); 
}

function saveTask(todoText, completed, date) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: todoText, completed: completed, date: date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTodoItem(task.text, task.completed, task.date);
    });
}

function createTodoItem(text, completed, date) {
    let todoContainer = document.getElementById("todoContainer");

    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

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
        todoContainer.removeChild(todoItem);
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
            todoContainer.removeChild(child);
        }
    });

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let hasVisibleTasks = false; 

    tasks.forEach(task => {
        if (task.date === date || date === '') {
            createTodoItem(task.text, task.completed, task.date);
            hasVisibleTasks = true; 
        }
    });

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
        let text = item.querySelector(".todo-text").textContent;
        let completed = item.querySelector(".todo-checkbox").checked;

        let date = item.querySelector(".todo-date") ? item.querySelector(".todo-date").textContent : '';
        tasks.push({ text: text, completed: completed, date: date });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
