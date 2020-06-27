{
  const tasks = [
    {
      content: "Play Xbox",
      done: false,
    },
    // {
    //   content: "Eat breakfast",
    //   done: true,
    // },
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
        >
        <button class="js-done">done</button>
        ${task.content}
        <button class="js-remove">delete</button>
      </li>
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
