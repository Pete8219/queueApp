/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

import M from "materialize-css/dist/js/materialize.min.js"

export const Detail = ({ detail, cancelHandler }) => {
  const userData = detail.data
  const roles = detail.roles
  const history = useHistory()
  const message = useMessage()
  const { request, error, clearError } = useHttp()

  const [form, setForm] = useState({
    name: userData.name,
    start: userData.start,
    end: userData.end,
    cabinet: userData.cabinet,
    userType: userData.userType,
    login: userData.login,
    password: userData.password,
  })

  const password = userData.password

  const rolesList = roles.map((item, i) => {
    return (
      <option key={i} value={item}>
        {item}
      </option>
    )
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateHandler = async (id) => {
    try {
      const data = await request(`/users/${id}`, "PATCH", { ...form })
      message(data.message)
      history.push("/users")
    } catch (e) {}
  }

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

  return (
    <div className="row">
      <h3>Редактирование пользователя</h3>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="ФИО сотрудника" name="name" id="name" type="text" onChange={changeHandler} value={form.name} />
            <label htmlFor="name">Сотрудник</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s4">
            <input placeholder="Кабинет" name="cabinet" id="cabinet" type="text" onChange={changeHandler} value={form.cabinet} />
            <label htmlFor="cabinet">Кабинет</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Начало приема, ч" name="start" id="start" type="text" onChange={changeHandler} value={form.start} />
            <label htmlFor="start">Начало приема</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Конец приема, ч" name="end" id="end" type="text" onChange={changeHandler} value={form.end} />
            <label htmlFor="end">Конец приема</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s4">
            <input placeholder="Логин пользователя" name="login" id="login" type="text" value={form.login} onChange={changeHandler} />
            <label htmlFor="login">Логин</label>
          </div>
          <div className="input-field col s4">
            <input placeholder="Пароль пользователя" name="password" id="password" type="password" onChange={changeHandler} value={form.password} />
            <label htmlFor="name">Пароль</label>
          </div>

          <div className="input-field col s4">
            <select value={form.userType} name="userType" onChange={changeHandler}>
              {rolesList}
            </select>
            <label>Права сотрудника</label>
          </div>
        </div>
        <div className="row">
          <a className="waves-effect waves-light btn" style={{ margin: "2rem" }} onClick={() => updateHandler(userData._id)}>
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
