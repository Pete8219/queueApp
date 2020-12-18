import React, { useState, useEffect } from "react"
import M from "materialize-css/dist/js/materialize.min.js"
/* import { Modal, Button, select } from "react-materialize" */

export const Detail = ({ detail }) => {
  const [users, setUsers] = useState([])

  const data = detail.users.map((item) => {
    return item
  })

  useEffect(() => {
    setUsers(data)
  }, [])

  useEffect(() => {
    M.AutoInit()
  }, [])

  const userList = users.map((item, i) => {
    return (
      <option key={i} value={item._id}>
        {item.name}
      </option>
    )
  })

  console.log(users)

  return (
    <div className="row">
      <h3>Редактирование услуги</h3>

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="title" name="title" type="text" value={detail.service.title} style={{ color: "#000" }} />
            <label Htmlfor="title">Название услуги</label>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="time" name="time" typse="text" value={detail.service.time} style={{ color: "#000" }} />
              <label Htmlfor="title">Время оказания, мин</label>
            </div>
          </div>
          <select className="browser-default col st-6">{userList}</select>
          <div className="input-field col s12">
            <select>
              {/*               <option value="" disabled selected>
                Choose your option
              </option> */}
              {userList}
            </select>
            <label> Materialize Select</label>
          </div>
        </div>
      </form>
    </div>
  )
}
