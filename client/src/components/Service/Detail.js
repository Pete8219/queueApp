import React, { useState, useEffect } from "react"
import M from "materialize-css/dist/js/materialize.min.js"
/* import { UserList } from "../../components/UserList" */

export const Detail = ({ detail }) => {
  console.log(detail)

  const data = detail.users.map((item) => {
    return item
  })

  /*   const userName = detail.users.filter((item) => {
    return item._id === detail.service.user
  }) */

  const userName = !detail.service.user.name ? "Choose user" : detail.service.user.name
  console.log(userName)

  const [form, setForm] = useState({
    userId: detail.service.employee,
    title: detail.service.title,
    time: detail.service.time,
    select: detail.service.user.name,
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const listItem = data.map((user, i) => {
    return (
      <option key={i} value={user._id}>
        {user.name}
      </option>
    )
  })

  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row">
      <h3>Редактирование услуги</h3>

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="title" name="title" type="text" value={form.title} style={{ color: "#000" }} onChange={changeHandler} />
            <label htmlFor="title">Название услуги</label>
          </div>
          <div className="input-field col s4">
            <input id="time" name="time" type="text" value={form.time} style={{ color: "#000" }} onChange={changeHandler} />
            <label htmlFor="title">Время оказания</label>
          </div>
          <div className="input-field col s8">
            <select name="select" defaultValue={form.select} onChange={changeHandler}>
              {/* <option selected={form.select}>{form.select}</option> */}
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
