import React from 'react'
import styles from "./Header.module.css"
import { SearchForm } from "../../../UI/SearchForm/SearchForm"
import { Input } from '../../../UI/Input/Input'
import { Calendar } from '../../../UI/Calendar/Calendar'


export const Header = ( {props} ) => {
    const { getCalendarDate, update } = props
    

    return (
        <div className = "row col s12">
              <div className={styles.header}>
                  <SearchForm>
                  <Input 
                             placeholder="Поиск посетителя по фамилии" 
                             id="filterUser" 
                             name ="filterUser" 
                             type="text"
                             onChange={e => props.getVisitorTickets(e.target.value)}
                             onKeyPress={props.pressHandler}
                        />
                  </SearchForm>  
                  
                  <Calendar props={{getCalendarDate, update}}/> 
                 
              </div> 
        </div>
    )
}
