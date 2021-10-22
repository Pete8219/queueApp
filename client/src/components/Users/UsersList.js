/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import styles from "./users.module.css"


export const UsersList = ({ users, onDelete, onEdit, onCreate }) => {


  return (
    <div className={styles.MainContainer}>
    <div className="row col-s12">
      <h4> Список сотрудников</h4>
      <a className="btn-floating btn-large waves-effect waves-light red" title="Добавить" style={{ float: "right" }} onClick={onCreate}>
        <i className="material-icons">add</i>
      </a>
      <div className="card table-service padding-10" style={{padding:"20px"}}>
        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Сотрудник</th>
              
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
                  
                  <td>
                    {" "}
                    <a className="btn-floating btn-small waves-effect blue darken-2" title="Редактировать" target="_blank" style={{float:"right"}} onClick={() => onEdit(item._id)}> 
                      <i className="material-icons">settings</i>
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
    </div>
  )
}
