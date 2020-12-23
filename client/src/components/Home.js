import React from 'react'

export const Home = ({ service }) => {
    console.log(service)
    return (
        <div className="container" >
            <h3 style={{textAlign:"center"}}>Выберите услугу</h3>
            <div className="service-container" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridGap:"1rem"}}>
                {service.map(item => {
                    return(
                        <div className="card">
                        <h4>{item.title}</h4>
                    </div>
                    )
                })}
            </div>
         
           

        </div>
    )
}