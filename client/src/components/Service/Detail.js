/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import M from "materialize-css/dist/js/materialize.min.js"

export const Detail = ({ detail }) => {
  console.log(detail)

  const message = useMessage()
  const { request } = useHttp()
  const history = useHistory()

  const data = detail.users.map((item) => {
    return item
  })

  const userName = !detail.service.user.name ? "Choose user" : detail.service.user.name
  console.log(userName)

  const [form, setForm] = useState({
    userId: detail.service.employee,
    title: detail.service.title,
    time: detail.service.time,
    select: detail.service.user._id,
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateHandler = async () => {
    try {
      const data = await request(`/services/${detail.service._id}`, "PATCH", { ...form })
      message(data.message)
      history.push("/services")
    } catch (e) {}
  }

  const cancelHandler = () => {
    history.push("/services")
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
            <input type="text" id="title" name="title" value={form.title} className="materialize-textarea" onChange={changeHandler} />
            <label htmlFor="title">Название</label>
          </div>
          <div className="input-field col s4">
            <input id="time" name="time" type="text" value={form.time} style={{ color: "#000" }} onChange={changeHandler} />
            <label htmlFor="title">Время оказания</label>
          </div>
          <div className="input-field col s8">
            <select name="select" defaultValue={form.select} onChange={changeHandler}>
              {listItem}
            </select>
            <label>Сотрудник</label>
          </div>
        </div>
        <div className="row">
          <a className="waves-effect waves-light btn" style={{ margin: "2rem" }} onClick={updateHandler}>
            Сохранить
          </a>
          <a className="waves-effect waves-light btn" onClick={cancelHandler}>
            Отмена
          </a>
        </div>
      </form>
    </div>
  )
}
