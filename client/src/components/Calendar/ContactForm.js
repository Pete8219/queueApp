import React, { useEffect } from "react"
import M from "materialize-css/dist/js/materialize.min.js"

export const ContactForm = ({ changeTimeTableHandler, changeFormHandler, submitFormHandler }) => {
  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row contactForm">
      <h4>Заполните данные о себе</h4>
      <a class="waves-effect waves-light btn" onClick={changeTimeTableHandler}>
        <i class="material-icons left">arrow_back</i>Вернуться к выбору времени
      </a>

      <div className="col s12" style={{ marginTop: "2rem" }}>
        <div className="card white darken-1 col s12" style={{ margin: "0 auto", padding: "1rem" }}>
          <div className="row">
            <form className="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input placeholder="Фамилия" id="lastname" name="lastname" type="text" class="validate" onChange={changeFormHandler} />
                  <label for="lastname">Фамилия</label>
                </div>
                <div class="input-field col s12">
                  <input placeholder="Имя" id="firstname" name="firstname" type="text" class="validate" onChange={changeFormHandler} />
                  <label for="firstname">Имя</label>
                </div>
                <div class="input-field col s12">
                  <input placeholder="Отчество" id="surname" name="surname" type="text" class="validate" onChange={changeFormHandler} />
                  <label for="surname">Отчество (при наличии)</label>
                </div>
                <div class="input-field col s12">
                  <input placeholder="+79хх-ххх-хххх" id="phone" name="phone" type="text" class="validate" onChange={changeFormHandler} />
                  <label for="phone">Номер телефона для связи</label>
                </div>
                {/* <div class="input-field col s12">
                  <input placeholder="+79хх-ххх-хххх" id="user" name="user" type="hidden" class="validate" value={service.service.user._id} />
                </div> */}
              </div>
              <a class="waves-effect waves-light btn" onClick={submitFormHandler}>
                <i class="material-icons left">check</i>Записаться на прием
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
