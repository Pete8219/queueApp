export const ButtonCreate = ({action}) => {
    return (
        <button className="btn-floating btn-large waves-effect waves-light red" title="Добавить" style={{ float: "right" }} onClick={action}>
          <i className="material-icons">add</i>
        </button>
    )
}