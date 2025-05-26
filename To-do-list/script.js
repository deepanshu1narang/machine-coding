document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.querySelector(".todo-form");
    const todoInput = document.querySelector(".todo-input");
    todoInput.focus();
    const todoSubmit = document.querySelector(".todo-submit");
    const todoList = document.querySelector(".todo-list");

    let editMode = false;
    let editItem = null;

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const todoText = todoInput.value.trim();

        if (todoText.length !== 0) {
            // add that to todo-list
            if (editMode) {
                editItem.firstChild.textContent = todoText;
                editMode = false;
                editItem = null;
            }
            else {
                addTodoItem(todoText);
            }
        }
        else {
            alert("Please enter valid task.");
        }
    });

    todoList.addEventListener('click', function (event) {
        const target = event.target;
        // to check if the target is button only
        if (target.tagName === "BUTTON") {
            const todoItem = target.parentNode;
            if (target.innerText === "❌") {
                todoItem.remove(); // given by html
            }
            else if (target.innerText === "✏") {
                editMode = true;
                editItem = todoItem;
                todoSubmit.innerText = "Edit Todo"
                todoInput.value = todoItem.firstChild.textContent;
                todoInput.focus();
            }
        }
    });

    function addTodoItem(todoText) {
        const todoItem = document.createElement("li");
        const editButton = document.createElement("button");
        const removeButton = document.createElement("button");

        todoItem.innerHTML = `<span>${todoText}</span>`;
        editButton.innerText = "✏";
        removeButton.innerText = "❌";

        todoItem.appendChild(editButton);
        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);
        todoInput.value = "";
    }

})