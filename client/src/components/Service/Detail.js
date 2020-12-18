import React from 'react'
import {Modal, Button, select} from 'react-materialize'

export const Detail = ({detail}) => {
    console.log((detail))

    detail.users.map(item => {
        console.log(item)
    })
    return (
        
         <div className="row">
             <h3>Редактирование услуги</h3>
             
             <form className="col s12">
                    <div class="row">
                        <div className="input-field col s12">
                            <input id="title" name="title" type="text" value={detail.service.title} style={{color:"#000"}}/>
                            <label Htmlfor="title">Название услуги</label>
                        </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="time" name="time" type="text" value={detail.service.time} style={{color:"#000"}}/>
                            <label Htmlfor="title">Время оказания, мин</label>
                        </div>
                    </div>
                    
                           <select>
                           <option value="default" disabled selected>Choose your option</option>
                           {detail.users.map( item => {
                               <option value="item._id" >{item.name}</option>

                           })}
                           
                         
                            </select>
                           <label>Materialize Select</label>
                       </div> 
                 
                    
             </form>
    
        </div>
    )
 
}