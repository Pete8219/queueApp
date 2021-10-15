import React, {useEffect} from 'react'
import M from "materialize-css/dist/js/materialize.min.js"

export const ShowModal = ({showModal, ticket, ticketData, serviceData, userData, note, rewriteRecord, save, cancel}) => {

    useEffect(() => {
        M.AutoInit()
      }, [])
    
    //const {date, firstname, lastname, surname, phone, email} = ticketData
    const {date, firstname, lastname, surname, phone, email} = ticket
    
    return (
        <>
           {!showModal ? (
               <div>
               <div className="modalWindow" style={{position:"absolute", display:"grid",justifyContent:"center",top:"0", left:"0", width:"100%", height:"100%", backgroundColor:"#1c1c1d", zIndex:"1000", opacity:"80%"}}>
               </div>    
                   <div className="modalWindow_body container" style={{position:"absolute", display:"grid", top:"20%",gridTemplateColumns:"1fr", height:"auto",  background:"#fff",zIndex:"1001",opacity:"100%", padding:"2rem",borderRadius:"10px"}}>
                   
                    <h4>Подробная информация о записи</h4>
                    <div  >
                        <p><b>Посетитель:</b>  {firstname} {lastname} {surname} </p>
                        <p><b>Телефон:</b> {phone} </p>
                        <p><b>Email:</b> {email} </p>
                        <p><b>Вопрос:</b> {serviceData.title} </p>
                        <p><b>Дата приема:</b>  {date.slice(0,10).split('-').reverse().join('.')} </p>
                        <p><b>Время приема:</b> {date.slice(11,16)} </p>
                        <p><b>Кабинет:</b>  {userData.cabinet} </p> 
                        <p><b>Прием ведет:</b> {userData.name} </p>
                        <div className="row">
                            <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                <textarea id="note" defaultValue={note} className="materialize-textarea"></textarea>
                                <label htmlFor="note">Примечание к записи</label>
                                </div>
                            </div>
                            </form>
                            </div>

                        
                     
                        <div style={{display:"flex", flexDirection:"column",justifyContent:"center",justifyItems:"center"}}>
                            <div style={{marginBottom:"1rem"}}>
                            <button className="waves-effect btn-small"   onClick= {rewriteRecord}>Перезаписать на другую дату</button>
                            </div> 
                           
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                            <button style ={{marginRight:"10px"}} className="waves-effect btn orange darken-4"   onClick= {save}>Сохранить</button>
                            <button className="waves-effect btn blue darken-1"    onClick= {cancel} >Отмена</button> 
                            </div>
                            
                        </div> 
                     
                      
                    

                </div>
                   </div>
               

                   </div>   

           ) : null}
        </>

    )
}