/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import M from "materialize-css/dist/js/materialize.min.js"
import { CategoryDropdown } from '../Category/CategoryDropdown'
import { UsersDropdown } from "../Users/UsersDropdown"

export const Detail = ({ service, users, categories }) => {
  console.log(service)

  const message = useMessage()
  const { request } = useHttp()
  const history = useHistory()

  const [form, setForm] = useState({
    title: service.title,
    time: service.time,
    user: service.user._id,
    category: service.category._id
  })



  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateHandler = async () => {
    try {
      const data = await request(`/services/${service._id}`, "PATCH", { ...form })
      message(data.message)
      history.push("/services")
    } catch (e) {}
  }

  const cancelHandler = () => {
    history.push("/services")
  }



  return (
    <div className="row">
      <h3>Редактирование услуги</h3>

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input type="text" id="title" name="title" value={form.title} className="materialize-textarea" onChange={changeHandler} />
            <label htmlFor="title">Название</label>
          </div>
          <CategoryDropdown
            categories={categories}
            category={form.category}
            handler={changeHandler}
          />
          <div className="input-field col s4">
            <input id="time" name="time" type="text" value={form.time} style={{ color: "#000" }} onChange={changeHandler} />
            <label htmlFor="title">Время оказания</label>
          </div>
          <UsersDropdown 
            users={users}
            user={form.user}
            handler={changeHandler}
            />
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
