import React, { useEffect } from 'react'
import M from "materialize-css/dist/js/materialize.min.js"

export const DateSelect = ({currentDate, handler}) => {
    useEffect(() => {
        M.AutoInit()
      }, [])
    
      useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const dateArray=[]

    for (let i = 0; i < 14; i ++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        const isoDate = date.toISOString()

        dateArray.push({date: date.toLocaleDateString(), iso: isoDate.slice(0,10).split('.').reverse().join('-')})

    }

    

    return (
         <div className="input-field col s4">
        <p>Список посетителей на:</p> 
        <select className="browser-default" defaultValue={currentDate} onChange={handler}>
            {dateArray.map((item,index) => {
                return (
                    <option key={index} value={item.iso}>{item.date}</option>
                )
            })}
         
        </select>
        </div>
    )
    
    
}