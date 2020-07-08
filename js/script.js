{
  let tasks = [];
  let hideDoneTasks = false;

  const bindHideButton = () => {
    const hideButton = document.querySelector(".js-hideDoneButton");
    hideButton.addEventListener("click", () => {
      hideDoneTasks = !hideDoneTasks;
      render();
    });
  };

  const bindAllDoneButton = () => {
    const allDoneButton = document.querySelector(".js-setDoneAll");
    allDoneButton.addEventListener("click", () => {
      tasks.forEach((task, index) => {
        if (!task.done) {
          toogleTaskDone(index);
        }
      });
    });
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toogleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];
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

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
      <li class="tasks__item js-task ${
        task.done && hideDoneTasks ? "task__item--hide" : ""
      }">
        <button  class="tasks__button tasks__button--toogleDone js-toogleDone">
          ${task.done ? "✔" : ""}
        </button>
        <span class="tasks__content 
          ${task.done ? "tasks__content--done" : ""}">${task.content}
        </span>
        <button class="tasks__button tasks__button--remove js-remove">
        🗑
        </button>
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };
  const renderButtons = () => {
    let buttonsHTMLContent = "";

    if (tasks.length) {
      buttonsHTMLContent += `
      <button class="section__button js-hideDoneButton">
       ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"} 
      </button>
      <button class="section__button js-setDoneAll"  ${
        tasks.every(({ done }) => done) ? "disabled" : ""
      }>
        Ukończ wszystkie
      </button>`;

      const insertHTML = document.querySelector(".js-buttonsContainer");
      insertHTML.innerHTML = buttonsHTMLContent;

      bindHideButton();
      bindAllDoneButton();
    } else {
      insertHTML.innerHTML = buttonsHTMLContent;
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

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
