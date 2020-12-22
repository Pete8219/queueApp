/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"


export const UsersList = ({ users, onDelete, onEdit, onCreate }) => {


  return (
    <div className="row col-s12">
      <h3> Список сотрудников</h3>
      <a className="btn-floating btn-large waves-effect waves-light red" title="Добавить" style={{ float: "right" }} onClick={onCreate}>
        <i className="material-icons">add</i>
      </a>
      <div className="card table-service">
        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Сотрудник</th>
              <th>Логин</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.login}</td>
                  <td>
                    {" "}
                    <a className="btn-floating btn-small waves-effect blue darken-2" title="Редактировать" target="_blank" style={{float:"right"}} onClick={() => onEdit(item._id)}> 
                      <i className="material-icons">create</i>
                    </a>
                  </td>
                  <td>
                    {" "}
                    <a className="btn-floating btn-small waves-effect blue darken-2" title="Удалить" target="_blank" style={{float:"right"}}  onClick={() => onDelete(item._id)} >
                      <i className="material-icons">delete_forever</i>
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}