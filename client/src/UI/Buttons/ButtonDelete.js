export const ButtonDelete = (props) => {
  return (
    <button
      className="btn-floating btn-small waves-effect blue darken-2"
      title="Удалить"
      target="_blank"
      {...props}
    >
      <i className="material-icons">delete_forever</i>
    </button>
  );
};
