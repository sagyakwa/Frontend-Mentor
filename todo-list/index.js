const textBox = document.querySelector("#text-box");
const addButton = document.querySelector("#add-button");
const mainContainer = document.querySelector("#main-container");

window.addEventListener("click", () => {
    textBox.focus();
});

const addItem = (event) => {
    if (textBox.value !== "" && (event.target === addButton)) {
        /**** ELEMENT CREATION *****/
            // Create and style the to-do item container
        const todoItemContainer = document.createElement("div");
        todoItemContainer.classList.add("todo-item-container");
        // Create and style the checkbox and text container
        const checkboxAndTextContainer = document.createElement("div");
        checkboxAndTextContainer.classList.add("checkbox-and-text-container");
        // Create and style the checkbox container
        const checkboxContainer = document.createElement("label");
        checkboxContainer.classList.add("checkbox-container");
        // Create and style the checkbox
        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.checked = false;
        checkbox.addEventListener("click", onCheckBoxClicked);
        // Create and style custom checkmark
        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");
        // Create the p- tag the text box value will live in
        const pTag = document.createElement("p");
        pTag.innerText = textBox.value;
        // Create and style close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", onCloseButtonClicked);
        /**** ADD ELEMENTS ACCORDINGLY *****/
        // Add the checkbox and custom checkmark to the checkbox container
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkmark);
        // Add the checkbox container the checkboxAndTextContainer
        checkboxAndTextContainer.appendChild(checkboxContainer);
        checkboxAndTextContainer.appendChild(pTag);
        // Add the checkboxAndTextContainer and the close button to the to-do item container
        todoItemContainer.appendChild(checkboxAndTextContainer);
        todoItemContainer.appendChild(closeButton);
        // Finally, add the todoItemContainer to the main container
        mainContainer.appendChild(todoItemContainer);
        // Clear text box
        textBox.value = "";
    }
}

textBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addButton.classList.toggle("active");
        addButton.click();
        setTimeout(() => {
            addButton.classList.toggle("active");
        }, 100);
    }
});
addButton.addEventListener("click", addItem);

const onCheckBoxClicked = (mouseEvent) => {
    const pTag = mouseEvent.target.parentNode.nextSibling;
    pTag.classList.toggle("strike-through");
};

const onCloseButtonClicked = (mouseEvent) => {
    const todoItemContainer = mouseEvent.target.parentNode;
    todoItemContainer.classList.add("zoom-delete");
    setTimeout(() => {
        todoItemContainer.remove();
    }, 300);
};
