{
  const tasks = [];

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toogleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToogleDoneEvents = () => {
    const toogleDoneButtons = document.querySelectorAll(".js-toogleDone");

    toogleDoneButtons.forEach((toogleDoneButton, index) => {
      toogleDoneButton.addEventListener("click", () => {
        toogleTaskDone(index);
      });
    });
  };

  const render = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
      <li class="tasks__item js-task">

        <button  class="tasks__button tasks__button--toogleDone js-toogleDone">
        ${task.done ? "✔" : ""}</button>
        <span class="tasks__content 
        ${task.done ? "tasks__content--done" : ""}">${task.content}</span>
        <button class="tasks__button tasks__button--remove js-remove">🗑</button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
    bindRemoveEvents();
    bindToogleDoneEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
