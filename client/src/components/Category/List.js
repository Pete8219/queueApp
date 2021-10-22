import React from 'react'
import { ButtonCreate } from "../ButtonCreate"
import styles from "./category.module.css"


export const List = ({categories, create, edit, OnDelete}) => {
    return (
      <div className={styles.MainContainer}>
        <div className="row col-s12">
        <h4>Категории услуг</h4>
        <ButtonCreate action={() => create('Create')}/>
        <div className="card table-service padding-10">
          <table className="striped">
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
  
            <tbody>
              {categories.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      {" "}
                      <button className="btn-floating btn-small waves-effect blue darken-2" title="Редактировать" target="_blank" onClick={() => edit(item._id, 'Detail')}>
                        <i className="material-icons">create</i>
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button className="btn-floating btn-small waves-effect blue darken-2" title="Удалить" target="_blank" onClick={() => OnDelete(item._id)}>
                        <i className="material-icons">delete_forever</i>
                      </button>
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