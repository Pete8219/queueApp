import React, { useState, useEffect } from "react"
import M from "materialize-css/dist/js/materialize.min.js"

export const CreateService = (data) => {
  /* const [users, setUsers] = useState("") */
  const [form, setForm] = useState({
    title: "",
    time: "",
    user: "Выберите сотрудника",
  })

  const usersArray = data.data.map((item) => {
    return item
  })

  /*   useEffect(() => {
    setUsers(users)
  }, []) */

  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  console.log(usersArray)

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const userList = usersArray.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {user.login}
      </option>
    )
  })

  return (
    <div className="row">
      <h4>Создаем новую услугу</h4>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Введите название услуги" id="title" name="title" type="text" className="validate" onChange={changeHandler} />
            <label htmlFor="title">Название</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Время,мин" id="time" type="text" name="time" className="validate" onChange={changeHandler} />
            <label htmlFor="time">Время оказания</label>
          </div>
          <div className="input-field col s8">
            <select name="user" defaultValue={form.user} onChange={changeHandler}>
              {userList}
            </select>
            <label>Сотрудник</label>
          </div>
        </div>
      </form>
    </div>
  )
}
