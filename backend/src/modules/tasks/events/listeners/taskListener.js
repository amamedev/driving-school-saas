import emitter from "../eventBus.js";

emitter.on("createdTask", async (newTask) => {
  console.log("Task creada", newTask);
});
