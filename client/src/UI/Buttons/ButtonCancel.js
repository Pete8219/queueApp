export const ButtonCancel = ({ action }) => {
  return (
    <button
      className="waves-effect waves-light btn"
      style={{ margin: "2rem" }}
      onClick={action}
    >
      Отмена
    </button>
  );
};
