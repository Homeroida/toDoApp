function renderTaskTemplate(task) {
  return `
  <li data-task-id="${task.id}" class="${task.completed ? "completed" : ""}">
    <div class="flex-cross">
      <div class="checkbox-item">
        <input data-action="completed" class="checkbox1" type="checkbox" />
  
        <div class="${task.completed ? "input-div" : ""}"></div>
      </div>
      <h3 class="main-text">${task.title}</h3>
    </div>
    <img src="./images/icon-cross.svg" />
  </li>`;
}

function rerenderTaskLength(tasks) {
  return `${tasks.length} tasks left`;
}

let image = document.querySelector(".img");
let background = document.querySelector(".background");
let darkElement = document.querySelectorAll(".dark");
let mainTextElements = document.querySelectorAll(".main-text");
let checkboxItems = document.querySelectorAll(".checkbox-item");
let filterAll = document.querySelector(".all");
let filterActive = document.querySelector(".active");
let filterCompleted = document.querySelector(".finish");
let activeText = document.querySelector(".active-text");
let clear = document.querySelector(".clear");
let clearCompleted = document.querySelector(".clear-completed");

let num = 0;

activeText.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-filtered") === "all") {
    filterAll.style.color = "#3a7cfd";
    filterActive.style.color = "#9495a5";
    filterCompleted.style.color = "#9495a5";
    fetchTasks();
  }

  if (e.target.getAttribute("data-filtered") === "active") {
    filterAll.style.color = "#9495a5";
    filterActive.style.color = "#3a7cfd";
    filterCompleted.style.color = "#9495a5";

    activeTasks();
  }

  if (e.target.getAttribute("data-filtered") === "finish") {
    filterCompleted.style.color = "#3a7cfd";
    filterAll.style.color = "#9495a5";
    filterActive.style.color = "#9495a5";
    completedTasks();
  }
});

clear.addEventListener("click", async () => {
  clearCompletedTasks();
});

image.addEventListener("click", () => {
  if (num == 0) {
    document.body.style.backgroundColor = "#171823";
    background.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
    image.src = "./images/icon-sun.svg";

    for (let z = 0; z < mainTextElements.length; z++) {
      mainTextElements[z].style.color = "white";
    }

    for (let i = 0; i < darkElement.length; i++) {
      darkElement[i].classList.add("darkElement");
    }

    for (let t = 0; t < checkboxItems.length; t++) {
      checkboxItems[t].style.background = "#25273D";
    }
    num = 1;
  } else {
    document.body.style.backgroundColor = "#fff";
    background.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
    image.src = "./images/icon-moon.svg";

    for (let z = 0; z < mainTextElements.length; z++) {
      mainTextElements[z].style.color = "#494C6B";
    }

    for (let i = 0; i < darkElement.length; i++) {
      darkElement[i].classList.remove("darkElement");
    }

    for (let t = 0; t < checkboxItems.length; t++) {
      checkboxItems[t].style.background = "white";
    }
    num = 0;
  }
});
