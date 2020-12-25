import React from "react"

export const CalendarDay = ({ day, countAllTicket, dayOfWeek }) => {

                return (
                    <div className="row">
                    <div className="card blue darken-1">
                        <p>{day}</p>
                    {/* <span>{dayOfWeek}</span> */}
                    
                    <p>Талонов осталось: {countAllTicket}</p>  
                    </div>
                </div>
                )

   

}
