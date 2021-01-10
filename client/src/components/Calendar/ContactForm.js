/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react"
import M from "materialize-css/dist/js/materialize.min.js"

export const ContactForm = ({ form, changeTimeTableHandler, changeFormHandler, submitFormHandler }) => {
  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row contactForm">
      <h4>Заполните данные о себе</h4>
      <a className="waves-effect waves-light btn" onClick={changeTimeTableHandler}>
        <i className="material-icons left">arrow_back</i>Вернуться к выбору времени
      </a>

      <div className="col s12" style={{ marginTop: "2rem" }}>
        <div className="card white darken-1 col s12" style={{ margin: "0 auto", padding: "1rem" }}>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Фамилия" id="lastname" name="lastname" type="text" class="validate" value={form.lastname} onChange={changeFormHandler} />
                  <label htmlFor="lastname">Фамилия</label>
                </div>
                <div className="input-field col s12">
                  <input placeholder="Имя" id="firstname" name="firstname" type="text" class="validate" value={form.firstname} onChange={changeFormHandler} />
                  <label htmlFor="firstname">Имя</label>
                </div>
                <div className="input-field col s12">
                  <input placeholder="Отчество" id="surname" name="surname" type="text" class="validate" value={form.surname} onChange={changeFormHandler} />
                  <label htmlFor="surname">Отчество (при наличии)</label>
                </div>
                <div className="input-field col s12">
                  <input placeholder="89xxxxxxxxx" id="phone" name="phone" type="text" class="validate" value={form.phone} onChange={changeFormHandler} />
                  <label htmlFor="phone">Номер телефона для связи (например: 890281ХХХХХ)</label>
                </div>
              </div>
              <a className="waves-effect waves-light btn" onClick={submitFormHandler}>
                <i className="material-icons left">check</i>Записаться на прием
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
