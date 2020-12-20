/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react"
import { useHistory } from "react-router-dom"

export const ServicesList = ({ services }) => {
  const history = useHistory()
  const editHandler = (data) => {
    history.push(`/services/detail/${data}`)
  }

  const createHandler = () => {
    history.push("/services/create")
  }

  return (
    <div className="row col-s12">
      <h3>Список услуг управления</h3>
      <a className="btn-floating btn-large waves-effect waves-light red" title="Добавить" style={{ float: "right" }} onClick={createHandler}>
        <i className="material-icons">add</i>
      </a>
      <div className="card table-service">
        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование услуги</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {services.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    {" "}
                    <a className="btn-floating btn-small waves-effect light-blue lighten-1" title="Редактировать" target="_blank" onClick={() => editHandler(item._id)}>
                      <i className="material-icons">create</i>
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
