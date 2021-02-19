/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const ServicesList = ({ services, onDelete }) => {
  /* console.log(services) */
  const history = useHistory()
  const message = useMessage()
  const {request, error, clearError} = useHttp()
   
  const createHandler = () => {
    history.push("/services/create")
  }
  
  const editHandler = (data) => {
    
    history.push(`/services/detail/${data}`)
  }



  useEffect(()=> {
    message(error)
    clearError()
  }, [message, error, clearError, request])



  return (
    <div className="row col-s12">
      <h4>Список услуг управления</h4>
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
                    <a className="btn-floating btn-small waves-effect blue darken-2" title="Редактировать" target="_blank" onClick={() => editHandler(item._id)}>
                      <i className="material-icons">create</i>
                    </a>
                  </td>
                  <td>
                    {" "}
                    <a className="btn-floating btn-small waves-effect blue darken-2" title="Удалить" target="_blank" onClick={() => onDelete(item._id)}>
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
