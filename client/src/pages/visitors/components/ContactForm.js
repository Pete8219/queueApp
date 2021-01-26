import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'
import M from "materialize-css/dist/js/materialize.min.js"


export const ContactForm = () => {
   
    const history = useHistory()
    const message = useMessage()

    const serviceData = JSON.parse(localStorage.getItem('Items'))

    if(!serviceData) {
        history.push('/')
    }

    const [form, setForm] = useState({
        firstname:'',
        lastname:'',
        surname:'',
        phone: ''
    })
    
    const errors = []

    useEffect(() => {
        M.AutoInit()
      }, [])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])

      const changeHandler = (event) => {
          setForm({...form, [event.target.name]: event.target.value})

      }

      const blurHandler = (event) => {
           if(event.target.value === '' || event.target.value.length < 2 ) {
              message('Введите корректные данные в поле ' +  event.target.dataset.name)
              
          }  

         

      }

      const submitHandler = (e) => {
        e.preventDefault()

        for (let key in form) {
            if(form[key] === '' && key !== 'surname' ) {
                errors.push(key)
            }
        }

        if(errors.length) {
            message('Вы ввели не все данные')
            return
        }
       
        const ticketData = Object.assign(serviceData, form)
        localStorage.setItem('Items', JSON.stringify(ticketData))
        


      }

    
      return (

        <div className="container" >
            <h4>Заполните контактные данные</h4>
   
           

            <div className="row">
                <form className="col s12 contacts">
                    <div className="row">
                        <div className="input-field col s12">
                            
                            <input type="text" id="firstname" name="firstname" data-name="Фамилия" value={form.firstname} required = {true} className="validate" onChange={changeHandler} onBlur={blurHandler} />
                            <label htmlFor="firstname">Фамилия</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            
                            <input type="text" id="lastname" name="lastname" data-name="Имя" value={form.lastname} required={true} className="validate" onChange={changeHandler} onBlur={blurHandler} />
                            <label htmlFor="lastname">Имя</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            
                            <input type="text" id="surname" name="surname" value={form.surname} className="validate" onChange={changeHandler}/>
                            <label htmlFor="surname">Отчество (при наличии)</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                        <input id="phone" type="text" name="phone" value={form.phone} required={true} data-name="Номер телефона" className="validate" onChange={changeHandler} onBlur={blurHandler}/>
                        <label htmlFor="phone">Номер телефона</label>
                        
                        </div>
                    </div>

                    <div className="row" style={{display:"grid"}}>
                        <button className="waves-effect btn-large" onClick={submitHandler}>Записаться</button>
                    </div>

                </form>
            </div>
        </div>
    )
}