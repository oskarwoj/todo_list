{
  const tasks = [
    {
      content: "Play Xbox",
      done: false,
    },
  ];

  const addNewTask = (newTaskContent) => {
    const clearNewTaskValue = document.querySelector(".js-newTask");
    tasks.push({
      content: newTaskContent,
    });
    clearNewTaskValue.value = "";

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
      <li 
        ${task.done ? 'style="text-decoration: line-through"' : ""}
        ><div class="taskList__row">
        <button class="taskList__button js-done">	&#x2713</button>
        <span class="taskList__text">${task.content}</span>
        <button class="taskList__button taskList__button--color js-remove">&#x1F5D1</button>
      </li></div>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvent();
  };

  const bindEvent = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toogleDoneButtons = document.querySelectorAll(".js-done");

    toogleDoneButtons.forEach((toogleDoneButton, index) => {
      toogleDoneButton.addEventListener("click", () => {
        toogleTaskDone(index);
      });
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
