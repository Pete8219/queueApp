/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import M from "materialize-css/dist/js/materialize.min.js"
import { CategoryDropdown } from '../Category/CategoryDropdown'
import { UsersDropdown } from "../Users/UsersDropdown"

export const CreateService = ({users, categories}) => {
  console.log(categories)
    const [form, setForm] = useState({
    title: "",
    time: "",
    user: '',
    category: ''
  })

  const history = useHistory()
  const { request, error, clearError } = useHttp()
  const message = useMessage()


  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [message, error, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const cancelHandler = () => {
    history.push("/services")
  }

  const createHandler = async () => {
    try {
      const data = await request("/services", "POST", { ...form })
      message(data.message)
      history.push("/services")
    } catch (e) {}
  }

  return (
    <div className="row">
      <h4>Создаем новую услугу</h4>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea id="title" name="title" type="text" className="materialize-textarea" onChange={changeHandler} />
            <label htmlFor="title">Название</label>
          </div>
          <CategoryDropdown
             categories={categories}
             handler={changeHandler} 
             category={form.category}
             />
          <div className="input-field col s4">
            <input placeholder="Время,мин" id="time" type="text" name="time" className="validate" onChange={changeHandler} />
            <label htmlFor="time">Время оказания</label>
          </div>
          <UsersDropdown
            users={users}
            user={form.user}
            handler={changeHandler}
          />
        </div>
                <div className="row">
          <a className="waves-effect waves-light btn" style={{ margin: "2rem" }} onClick={createHandler}>
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
