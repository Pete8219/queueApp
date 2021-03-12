<div className="container" style={{display:"grid",width:"100%",justifyContent:"center", boxShadow:"2px 10px 20px 5px rgb(0 0 0 / 10%)" }}>
                        
                <div className= "card" style={{ display:"grid", zIndex:"1000", position:"absolute", width:"55%",top:"20%", borderRadius:"20px"}}>
                    <h4>Подробная информация о записи</h4>
                    <div className="ticketFormContent" style={{marginTop:"2rem"}} >
                        <span><b>Вопрос:</b> {/* {serviceData.title} */} </span>
                        <span><b>Дата приема:</b>  {date.slice(0,10).split('-').reverse().join('.')} </span>
                        <span><b>Время приема:</b> {date.slice(11,16)} </span>
                        <span><b>Кабинет:</b> {/* {userName.cabinet} */} </span> 
                        <span><b>Прием ведет:</b> {/* {userName.name} */} </span> {//Здесь нужно выводить имя реального сотрдуника, который оказывает услугу
                        }
                    <span><b>Посетитель:</b>  {firstname} {lastname} {surname} </span> 
                        <div className="row" style={{display:"grid"}}>
                        <button className="waves-effect btn-large" style={{display:"grid",width:"100%", float:"right"}}  /* onClick= {clickHandler} */ >Перезаписать на другую дату</button> 
                        <button className="waves-effect btn-large" style={{display:"grid",width:"100%", float:"right"}}   onClick= {closeModal} >Отмена</button> 
                        </div> 
                    </div> 
                      
                    

                </div>
             {/*    <div className="row" style={{display:"grid"}}>
                <button className="waves-effect btn-large"  /* onClick= {clickHandler}  >Перезаписать на другую дату</button>
                </div> */}
                </div>