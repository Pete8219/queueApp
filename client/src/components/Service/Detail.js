import React, { useState, useEffect } from "react"
import M from "materialize-css/dist/js/materialize.min.js"
import {UserList} from '../../components/UserList'


export const Detail = ({ detail }) => {
 /*  const [user, setUser] = useState('') */

  const data = detail.users.map((item) => {
    return item
  })
 
  
  const listItem = data.map((user, i) => {
        return (
        <option key={i} value={user._id}>{user.name}</option>
        )
  })

    useEffect(() => {
        M.AutoInit()
    }, [])

    useEffect( () =>{
        window.M.updateTextFields()
      }, [])

  const changeHandler = (event)=> {
      alert(event.target.value)
  }


  
  return (
    <div className="row">
      <h3>Редактирование услуги</h3>

      <form className="col s8">
        <div className="row">
          <div className="input-field col s12">
            <input id="title" name="title" type="text" value={detail.service.title} style={{ color: "#000" }} onChange={changeHandler}/>
            <label htmlFor="title">Название услуги</label>
          </div>
          <div className="input-field col s2">
            <input id="time" name="time" type="text" value={detail.service.time} style={{ color: "#000" }} onChange={changeHandler}/>
            <label htmlFor="title">Время оказания</label>
          </div>
            <div className="input-field col s10">
                    <select>
                        {listItem}
                    </select>
                    <label>Сотрудник</label>

            </div>
         
          {/* <UserList users={data}/> */}

         </div>
      </form>
    </div>
  )
}
