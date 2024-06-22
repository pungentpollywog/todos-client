import { useState } from "react";
import "./list.css";
import { Task } from "../task/task";

export default function List() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.length > 0) {
      setTasks((tasks) => [...tasks, { summary: task, id: crypto.randomUUID() }]);
      setTask("");
    }
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      addTask();
    }
  }

  return (
    <>
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
          <li key={task.key}>
            <Task {...task} />
          </li>
        ))}
      </ul>
    </>
  );
}
