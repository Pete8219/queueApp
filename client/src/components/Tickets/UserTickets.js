/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { DateSelect } from '../Calendar/DateSelect'
import { SearchForm } from "../../UI/SearchForm/SearchForm"
import { Input } from "../../UI/Input/Input"
import { List } from "./List/List"


export const UserTickets = ({ tickets, handleChange, date, dateHandler, visitor, findHandler, pressHandler, changeRecord }) => {


  const statusList = ["В работе", "Исполнено(проведена консультация)", "Исполнено(принято заявление)", "Исполнено(заявитель отказался подавать заяаление)", "Отказ от записи", "Не явился"]

  if(!tickets.length) {
    return (
      <div className="container" style={{width:"100%"}}>
            <div className = "row col s12">
              <div className="row col-s12" style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                  <SearchForm>
                  <Input 
                             placeholder="Поиск посетителя по фамилии" 
                             id="filterUser" 
                             name ="filterUser" 
                             type="text"
                             onChange={e => findHandler(e.target.value)}
                             onKeyPress={pressHandler}
                        />
                  </SearchForm>  
                 
                  <DateSelect currentDate = {date} handler={dateHandler}/>
              </div> 
            </div>
            <div className="row col s12">
              <h4>На сегодня записей нет</h4>
            </div>
            
      </div>
    )
  }
 
  return (
      <div className="container" style={{width:"100%"}}>
        <div className = "row col s12">
          <div className="row col-s12" style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
            <SearchForm handler={findHandler} pressHandler={pressHandler}>
                        <Input 
                             placeholder="Поиск посетителя по фамилии" 
                             id="filterUser" 
                             name ="filterUser" 
                             type="text"
                             onChange={e => findHandler(e.target.value)}
                             onKeyPress={pressHandler}
                        />
            </SearchForm>
            <DateSelect currentDate = {date} handler={dateHandler}/>
          </div> 


    <List tickets={tickets} date={date}/>

    <div className="row col s12">
      <div className="card" style={{padding:"20px"}}>
      <table className="striped">
        <thead style={{backgroundColor:"c2c2c2"}}>
          <tr>
            <th>#</th>
            <th>Посетитель</th>
            <th>Телефон</th>
            <th>Дата приема</th>
            <th>Время</th>
            <th>Статус</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => {
            const fullName = `${ticket.firstname} ${ticket.lastname}  ${ticket.surname}`
            const receptionDate = (new Date(ticket.date.slice(0,10))).toLocaleDateString()
            return (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td><a style={{textDecoration:"underline", cursor:"pointer"}} onClick={() => changeRecord(ticket._id)}> {fullName}</a></td>
                <td>{ticket.phone}</td>
                <td>{receptionDate}</td>

                <td>{ticket.date.slice(11, 16)}</td>
                <td>
                  <select className="browser-default" data-ticket-id={ticket._id} value={ticket.status} onChange={handleChange}>
                    {statusList.map((item, i) => {
                      return (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      )
                    })}

                  </select>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
    </div>
    </div>
  )
}
