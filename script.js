let add = document.getElementById("add");
add.addEventListener("click", addFunc);

function addFunc() {
    let todo = document.getElementById("iText").value;
    let box = document.getElementsByClassName("box")[0]; // Get the first element with class "box"

    if (todo.trim() === "") {
        alert("Please enter a todo item");
        return;
    }

    // Create a container for the todo item and radio button
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-item");

    // Create and style the radio button
    let radio = document.createElement("input");
    radio.type = "checkbox";
    radio.name = "todo";
    radio.classList.add("todo-radio"); // Add a class for styling
    radio.addEventListener("change", function() {
        if (radio.checked) {
            p.classList.add("completed");
        } else {
            p.classList.remove("completed");
        }
    });
    
    let trash = document.createElement("button");
    trash.textContent = "❌"
    
    trash.style.border = "None";

    trash.addEventListener("click", function(){
        box.removeChild(todoContainer)
    });


    // Create and style the <p> element for the todo text
    let p = document.createElement("p");
    p.textContent = todo;
    p.classList.add("todo-text"); // Add a class for styling

    // Append the radio button and <p> element to the container
    todoContainer.appendChild(radio);
    todoContainer.appendChild(p);
    todoContainer.appendChild(trash)

    // Append the todo container to the box
    box.appendChild(todoContainer);

    // Clear the input field
    document.getElementById("iText").value = "";
}



