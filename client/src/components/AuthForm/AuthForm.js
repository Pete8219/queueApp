import React, { useEffect } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import M from "materialize-css"
import styles from "./authForm.module.css"


const AuthForm = () => {

    useEffect(() => {
        M.AutoInit()
    },[])

    useEffect(()=> {
        M.updateTextFields()
    },[])

    const onChange = (value) => {
        console.log(value)
    }


    return (
        <div>
            <div className={styles.MainContainer}>
            <div className={styles.body}>
                <div className="card blue-grey darken-4" >
                <div className="card-content">
                    
                <ul className={["tabs", styles.MyTabs].join(" ")}>
                    <li className="tab col s6"><a className={styles.auth} href="#test1">Авторизация</a></li>
                    <li className="tab col s6"><a className={styles.auth} href="#test2">Регистрация</a></li>
                </ul>
                </div>
                <div id="test1" className={styles.TabOne}>
                    <div className="card blue-grey darken-4" style={{marginTop:"0rem"}} >
                                <div class="row">
                                <p className={styles.desc}>Если Вы уже зарегистрированы на сайте введите свой логин и пароль. Нет логина и пароля? перейдите во вкладку Регистрация  
                                        {/* <a href="./login/#test2"> Зарегистрируйтесь</a> */}
                                </p>
                                </div>
                                <div> 
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input placeholder="Введите имя пользователя" id="login" name="login" type="text" className="validate login" /* onChange={changeHandler} */ style={{ color: "#fff !important" }} />
                                        <label htmlFor="login">Логин </label>
                                        </div>
                                    </div>
                                </div>    
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">https</i>
                                        <input placeholder="Введите пароль" id="password" type="password" name="password" className="validate password" /* onChange={changeHandler} onKeyPress={pressHandler} */ style={{ color: "#fff !important" }} />
                                        <label htmlFor="password">Пароль</label>
                                    </div>


                                </div>
                    
                            
                            <div className="card-action center-align">
                                <button className="btn-large waves-effect waves-light blue lighten-1 login" /* onClick={loginHandler} disabled={loading} */> Войти </button>
                            </div>
                          

                    </div>
                </div>    
                <div id="test2" className={styles.TabOne}>

                        <div className="card blue-grey darken-4" style={{marginTop:"0rem"}}>

                                    <div> 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i className="material-icons prefix">account_circle</i>
                                                <input placeholder="Введите Ваш Email" id="email" name="email" type="email" className="validate email" /* onChange={changeHandler} */ style={{ color: "#fff !important" }} />
                                                <label htmlFor="email">Ваш Email</label>
                                            </div>
                                        </div>
                                    </div>    
                                    <div className="row">
                                    <p className={styles.desc}>После нажатия кнопки "Зарегистрироваться" на указанный вами email будет выслано письмо с ссылкой для подтверждения регистрации</p>
                                </div>
                                <div className="row">
                                <ReCAPTCHA 
                                    sitekey = "6Ld0Qx8dAAAAAK2IngHBH2l0msQ-VyPk_-SdMUgZ"
                                    onChange={onChange}
                                />
                                </div>

                                    <div className="card-action center-align">
                                             <button className="btn-large waves-effect waves-light blue lighten-1 login" /* onClick={loginHandler} disabled={loading} */> Зарегистрироваться </button>
                                    </div>
                        </div>
                </div>
        
            </div>
            </div> 
            </div>
        </div>
        
    )
}

export default AuthForm
