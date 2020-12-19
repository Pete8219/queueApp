import React, { useEffect } from 'react'
import M from "materialize-css/dist/js/materialize.min.js"


export const UserList = (users)=> {

/*  const userOptions = [
     {value: 0, name: 'Choose'}
 ]
  */
 


 const items = users.users.map( user => {
    return (
        <option key={user._id} value={user._id}>{user.name}</option>
    )
}) 

useEffect( ()=> {
    M.AutoInit()
}, [])

useEffect( () =>{
    window.M.updateTextFields()
  }, [])

    return (
        <div className="input-field col s10">
            {/* <h4>UserList</p> */}
        <select>
            {items}
        </select>
        <label>Сотрудник</label>

        </div>
        
  /*       <div class="input-field col s6">
        <select>
          <option value="" disabled selected>Choose your option</option>
          {userValue}
        </select>
        <label>Выберите сотрудника</label>
      </div>  */

    )

}