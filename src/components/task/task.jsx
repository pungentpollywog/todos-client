import PropTypes from "prop-types";

export function Task({ task, removeTask }) {
  return (
    <div>
      {task.summary}
      <button>edit</button>
      <button className="del" onClick={() => removeTask(task.id)}>
        delete
      </button>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
};
