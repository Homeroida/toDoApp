const BASE_URL = "https://api.tchanishvili.com/tasks/";

async function createTask(task) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTask(task_id) {
  try {
    const response = await fetch(`${BASE_URL}${task_id}`, {
      method: "DELETE",
    });

    // Check if the operation was successful (status code 200-299).
    if (response.ok) {
      return { success: true }; // Return a success indicator if the deletion was successful.
    } else {
      throw new Error("Failed to delete task."); // Throw an error if the server returned an error status.
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function updateTask(task_id, task) {
  try {
    const response = await fetch(`${BASE_URL}${task_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
}

const tasklist = document.getElementById("tasksList");
const taskLength = document.getElementById("taskLength");

async function fetchTasks() {
  const response = await fetch(BASE_URL);
  const tasks = await response.json();
  let tasksListRenderString = "";

  for (let task of tasks) {
    tasksListRenderString = tasksListRenderString + renderTaskTemplate(task);
  }

  taskLength.innerHTML = rerenderTaskLength(tasks);
  tasklist.innerHTML = tasksListRenderString;
}
async function fetchTask(task_id) {
  const response = await fetch(`${BASE_URL}${task_id}/`);
  const task = await response.json();
  return task;
}

async function activeTasks() {
  const response = await fetch(BASE_URL);
  const tasks = await response.json();
  let tasksListRenderString = "";

  for (let task of tasks) {
    if (task.completed == false) {
      tasksListRenderString = tasksListRenderString + renderTaskTemplate(task);
    }
  }

  taskLength.innerHTML = rerenderTaskLength(tasks);
  tasklist.innerHTML = tasksListRenderString;
}

async function completedTasks() {
  const response = await fetch(BASE_URL);
  const tasks = await response.json();
  let tasksListRenderString = "";

  for (let task of tasks) {
    if (task.completed == true) {
      tasksListRenderString = tasksListRenderString + renderTaskTemplate(task);
    }
  }

  taskLength.innerHTML = rerenderTaskLength(tasks);
  tasklist.innerHTML = tasksListRenderString;
}

async function clearCompletedTasks() {
  const response = await fetch(BASE_URL);
  const tasks = await response.json();

  for (let task of tasks) {
    if (task.completed) {
      await deleteTask(task.id);
    }
  }

  await fetchTasks();
}
