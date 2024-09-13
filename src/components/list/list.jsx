import { useEffect, useState } from 'react';
import './list.css';
import { Task } from '../task/task';
import { TaskEditor } from '../task/taskEditor';
import PropTypes from 'prop-types';

export default function List({ list, updateList, deleteList }) {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState(list.tasks);

  useEffect(() => {
    updateList(list, { tasks: tasks });
  }, [tasks]);

  function addTask() {
    if (taskText.length > 0) {
      setTasks((tasks) => {
        setTaskText('');
        return [
          ...tasks,
          { summary: taskText, id: crypto.randomUUID(), editing: false },
        ];
      });
    }
  }

  function removeTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function updateTask(task, fields) {
    const updatedTask = { ...task, ...fields };
    const idx = tasks.findIndex((_task) => _task.id === task.id);
    if (idx !== -1) {
      setTasks((currentTasks) => currentTasks.toSpliced(idx, 1, updatedTask));
    } else {
      throw new Error('Unable to find task to edit.');
    }
  }

  function handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      addTask();
    }
  }

  return (
    <div className="list">
      <h2>{list.name}</h2>
      <input
        type="text"
        placeholder={tasks.length ? 'and den?' : 'item or task'}
        value={taskText}
        onChange={(ev) => setTaskText(ev.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.editing ? (
              <TaskEditor task={task} editTask={updateTask} />
            ) : (
              <Task
                task={task}
                makeEdits={() => updateTask(task, { editing: true })}
                removeTask={removeTask}
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={deleteList}>Delete</button>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,
  deleteList: PropTypes.func,
};
