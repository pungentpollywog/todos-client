import PropTypes from "prop-types";

export function Task({ summary }) {
  return (
    <div>
      {summary}
      <button>edit</button>
      <button className="del">delete</button>
    </div>
  );
}

Task.propTypes = {
  summary: PropTypes.string.isRequired,
};
