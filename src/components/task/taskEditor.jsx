import PropTypes from "prop-types";
import { useState } from "react";

export function TaskEditor({ task, editTask }) {
  const [text, setText] = useState(task.summary);

  function saveTask() {
    editTask(task, { summary: text, editing: false });
  }

  function cancel() {
    editTask(task, { editing: false });
  }

  function updateText(ev) {
    setText(ev.target.value);
  }

  function saveTaskOnEnter(ev) {
    if (ev.key === 'Enter') {
      saveTask();
    }
  }

  return (
    <div>
      <input value={text} onChange={updateText} onKeyDown={saveTaskOnEnter} />
      <button onClick={saveTask}>save</button>
      <button onClick={cancel}>cancel</button>
    </div>
  );
}

TaskEditor.propTypes = {
  task: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
};
