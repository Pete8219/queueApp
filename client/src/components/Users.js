/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export const UsersList = ({ users })=> {
    
    

    return (
        <div className="row col-s12">
            <h3> Список сотрудников</h3>
            <a className="waves-effect waves-light btn" style={{float: "right"}}>Добавить</a>
            <div className="card table-service">
                <table className="striped">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Сотрудник</th>
                    <th>Логин</th>
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
                            <td><i className="material-icons" style={{float:"right"}}>create</i></td>
                            
                        </tr>
                        )}
                    )}
                
                
                </tbody>
            </table>
      </div>
      </div>

    )
}