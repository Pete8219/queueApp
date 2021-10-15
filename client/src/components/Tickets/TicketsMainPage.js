import React, { useState, useEffect, useContext } from 'react'
import { Header } from './Header/Header'
import { List } from './List/List'
import { AuthContext } from '../../context/AuthContext'
import { Loader } from '../Loader'
import { formatDate } from '../../utils/formatDate'
import { useHttp } from "../../hooks/http.hook"
import { SearchForm } from '../../UI/SearchForm/SearchForm'
import { Input } from '../../UI/Input/Input'
import { Calendar } from '../../UI/Calendar/Calendar'
import styles from "./mainPage.module.css"

export const TicketsMainPage = () => {
    const { userId, ready, token  } = useContext(AuthContext)
    const { loading, request } = useHttp()

    const [date, setDate] = useState( formatDate(new Date()))
    const [name, setName] = useState('')
    const [ticketList, setTicketList] = useState([])
    const [update, setUpdate] = useState(false)
    
    


    const getCalendarDate = (d) => {
        const selectedDate = formatDate(d) 
        setDate(selectedDate)
        


    } 

    const getVisitorTickets =  ( data )=> {
        let  text = ''
        if( text.length < 1) {
            text = data
        } else {
            text += data
        }
        
        setName(text.toUpperCase())
    }

     useEffect(() => {
         if(!date) {
             return
         }
        console.log('alert')

        const fetchTickets = async() => {
          try {
            const result = await request (`/tickets/ticketlist/${userId}/${date}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            
            setTicketList(result)


        } catch (error) { }

        }

        fetchTickets()
    },[ date, userId, request, token])  


//Обработчик нажатия кнопки Enter в  поле поиска зявителя
  const pressHandler = async(e) => {
                  
            if(e.key === 'Enter') {
                setDate('')
                console.log('dfsdf')
                     try {
                    const result =  await request(`/tickets/find/${name}`, 'GET', null , {
                        Authorization: `Bearer ${token}`
                    })
                    
                    setTicketList(result)
                    setName('')

                } catch(e) {}  
            }
            
    }
    
     if( !ready ) {
        <Loader />
    }


     if(loading) {
        <Loader />
    }  
    return (
        <div className={styles.MainContainer}>

            <div className={styles.Header}>
                <div>
                
                 <SearchForm>
                    <Input 
                        placeholder="Поиск посетителя по фамилии" 
                        id="filterUser" 
                        name ="filterUser" 
                        type="text"
                        onChange={e => getVisitorTickets(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                </SearchForm> 
                </div>
                
                <div>
                     <Calendar props={{getCalendarDate, update}}/> 
                </div> 
            </div>
        
        
        
        
            <div>
  
            {!loading && ticketList  && <List props = {{ userId, token, ticketList }}/>}
            </div>
        
        
        </div>
    )
    
}
