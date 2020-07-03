{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toogleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__item js-task">

        <button  class="tasks__button tasks__button--toogleDone js-toogleDone">
        ${task.done ? "✔" : ""}</button>
        <span class="tasks__content 
        ${task.done ? "tasks__content--done" : ""}">${task.content}</span>

        <button class="tasks__button tasks__button--remove js-remove">🗑</button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toogleDoneButtons = document.querySelectorAll(".js-toogleDone");

    toogleDoneButtons.forEach((toogleDoneButton, index) => {
      toogleDoneButton.addEventListener("click", () => {
        toogleTaskDone(index);
      });
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();
    newTask.focus();

    if (newTaskContent === "") {
      return;
    }

    newTask.value = "";
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
