import React from 'react'
import {useHistory} from 'react-router-dom'

export const ServicesList = ({ services })=> {
    console.log(services)
    const history = useHistory()
    const editHandler = async event => {
       
       history.push(`/service/detail/:id`)

    }

    return (
        <div className="row col-s12">
            
            <h3>Список услуг управления</h3>
            <a className="waves-effect waves-light btn" style={{float: "right"}} >Добавить</a>
            <div className="card table-service">
                <table class="striped">
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
                            <td> <a class="btn-floating btn-small waves-effect light-blue lighten-1" onClick={editHandler}><i class="material-icons">create</i></a></td>
                            
                        </tr>
                        )}
                    )}
                
                
                </tbody>
            </table>
      </div>
      </div>

    )
}