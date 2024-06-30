import { useState } from "react";
import "./list.css";
import { Task } from "../task/task";
import { TaskEditor } from "../task/taskEditor";
import PropTypes from "prop-types";

export default function List({ name, items, deleteList }) {
  const [taskText, setTask] = useState("");
  const [tasks, setTasks] = useState(items);

  function addTask() {
    if (taskText.length > 0) {
      setTasks((tasks) => [...tasks, { summary: taskText, id: crypto.randomUUID(), editing: false }]);
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
      <h2>{name}</h2>
      <input
        type="text"
        placeholder={tasks.length ? "and den?" : "item or task"}
        value={taskText}
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
      <button onClick={deleteList}>Delete</button>
    </div>
  );
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  deleteList: PropTypes.func,
};
