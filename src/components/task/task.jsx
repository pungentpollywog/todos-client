import PropTypes from "prop-types";

export function Task({ task, makeEdits, removeTask }) {
  return (
    <div className="task">
      {task.summary}
      <button onClick={makeEdits}>edit</button>
      <button className="del" onClick={() => removeTask(task.id)}>
        delete
      </button>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  makeEdits: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};
