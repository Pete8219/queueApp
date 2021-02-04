import React from 'react'

export const ServiceList = ({services, additionServices, handler}) => {
    if(additionServices.length) {
      services = services.concat(additionServices)
    }
    
    if (!services.length) {
      return (
        <div className="container">
          <h4>За Вами не закреплено ни одной услуги</h4>
        </div>
      )
    } else {
      return (
        <div className="container" style={{display:"grid"}}>
        <h4 style={{ textAlign: "center" }}>Выберите услугу</h4>
      
        <div className="service-container">
          <ul className="service-list">
              {services.map(item=> {
                  return (
                    <div key={item._id} className="card blue darken-2" onClick={() => handler(item._id)}  style={{ borderRadius: "5px",  display: "grid", justifyItems: "center", alignItems: "center" }}>
                      <li key={item._id}>{item.title}</li>
                    </div>
                  )
              })}
          </ul>
        </div>
      </div>
    )

    }
  

   
}