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
      <li><div class="taskList__row">
        <button ${
          task.done ? 'style="color: white"' : ""
        } class="taskList__button taskList__button--color js-done ">&#x2713</button>
        <span ${
          task.done ? 'style="text-decoration: line-through"' : ""
        } class="taskList__text">${task.content}</span>
        <button class="taskList__button  js-remove">&#x1F5D1</button>
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

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();
    newTask.focus();
    newTask.value = "";

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
