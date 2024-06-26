import { useState } from "react";
import "./list.css";
import { Task } from "../task/task";
import { TaskEditor } from "../task/taskEditor";

export default function List() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.length > 0) {
      setTasks((tasks) => [...tasks, { summary: task, id: crypto.randomUUID(), editing: false }]);
      setTask("");
    }
  }

  function removeTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function updateTask(task, fields) {
    const updatedTask = { ...task, ...fields };
    const idx = tasks.findIndex((_task) => _task.id === task.id);
    if (idx !== -1) {
      setTasks((currentTasks) => {
        const result = currentTasks.toSpliced(idx, 1, updatedTask);
        return result;
      });
    } else {
      throw new Error("Unable to find task to edit.");
    }
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      addTask();
    }
  }

  return (
    <div className="list">
      <h2>My List</h2>
      <input
        type="text"
        placeholder="task"
        value={task}
        onChange={(ev) => setTask(ev.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.editing ? (
              <TaskEditor task={task} editTask={updateTask} />
            ) : (
              <Task task={task} makeEdits={() => updateTask(task, { editing: true })} removeTask={removeTask} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
