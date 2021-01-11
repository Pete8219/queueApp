import React from 'react'

export const ReceptionService = ({service, changeService, selectedService}) => {


    const serviceList = service.map((service, i) => {
        return(
            <option key={i} value={service.title} data-id={service._id}>{service.title}</option>
        )
    })

    return (
        <div className="row col s6" style={{display:"grid"}}>
        <div className="input field col s6" style={{display:"grid", margin:"0 auto"}}>
            <label>Выберите услугу</label>
            <select className="browser-default"  value={selectedService.value} onChange={changeService}>
              <option value="Выберите дату">Выберите услугу</option>
                {serviceList}
            </select>
        </div>
    </div>
    )

}