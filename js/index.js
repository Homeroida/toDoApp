fetchTasks();

const titleInput = document.getElementById("task-title");
titleInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const task = {
      title: titleInput.value,
    };

    const data = await createTask(task);
    fetchTasks();

    titleInput.value = "";
  }
});

const tasksList = document.getElementById("tasksList");
tasksList.addEventListener("click", async (e) => {
  if (e.target.nodeName === "IMG") {
    const li = e.target.parentNode;
    const task_id = li.getAttribute("data-task-id");
    await deleteTask(task_id);
    fetchTasks();
  }

  if (e.target.getAttribute("data-action") === "completed") {
    e.preventDefault();
    const checkbox = e.target;
    const li = checkbox.closest("li");
    const task_id = li.getAttribute("data-task-id");
    const task = await fetchTask(task_id);

    await updateTask(task_id, { ...task, completed: !task.completed });
    fetchTasks();
  }
});
