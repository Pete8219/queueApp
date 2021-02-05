import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'
import { useHttp } from '../../../hooks/http.hook'
import M from "materialize-css/dist/js/materialize.min.js"


export const ContactForm = () => {
    const {request, error, clearError} = useHttp()
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

    const dataFromAdmin = JSON.parse(localStorage.getItem('TicketData'))


    
    const errors = []

    useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])

      useEffect(() => {
        M.updateTextFields()
        M.AutoInit()
        if(dataFromAdmin) {
            console.log(dataFromAdmin)
            const { firstname, lastname, surname, phone, _id } = dataFromAdmin
            setForm({
                firstname,
                lastname,
                surname,
                phone,
                ticketId: _id
            })
        }
      },[])

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

      const submitHandler = async (e) => {
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


        try {
            const data = await request('/tickets', 'POST', {...ticketData})
            if(data.errors) {

                return data.errors.map((error) => {
                    return message(error)
                  })
                }

               message(data.message)

               const userData = JSON.parse(localStorage.getItem('userData'))

               if(userData) {
                   /* message('Посетитель зарегистрирован') */
                   history.push('/')
               } else {
                   history.push('/ticket')
               }
               
                
   
        } catch(e) {}

        

      }

    
      return (

        <div className="container" >
            <h4>Заполните контактные данные</h4>
   
           

            <div className="row">
                <form className="col s12 contacts">
                    <div className="row">
                        <div className="input-field col s12">
                            
                            <input type="text" id="firstname" name="firstname" data-name="Фамилия" value={form.firstname} required = {true} className="validate" onChange={changeHandler} onBlur={blurHandler} />
                            <label htmlFor="firstname" className="active">Фамилия</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            
                            <input type="text" id="lastname" name="lastname" data-name="Имя" value={form.lastname} required={true} className="validate" onChange={changeHandler} onBlur={blurHandler} />
                            <label htmlFor="lastname" className="active">Имя</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            
                            <input type="text" id="surname" name="surname" value={form.surname} className="validate" onChange={changeHandler}/>
                            <label htmlFor="surname" className="active">Отчество (при наличии)</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                        <input id="phone" type="text" name="phone" value={form.phone} required={true} data-name="Номер телефона" className="validate" onChange={changeHandler} onBlur={blurHandler}/>
                        <label htmlFor="phone" className="active">Номер телефона</label>
                        
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