import React from 'react'
import M from "materialize-css"

export const Select = ({props}) => {
    console.log(props)

    //const [data, setData] = useState(props)
    
    return (
        <div className="input-field col s12" style={{padding: "0px"}}>
            <select className= "browser-default" defaultValue = "" >
                 {props.map((category) => {
                    return(
                        <option key={category._id} value={category.title}>{category.title}</option>
                    )
                })} 
                

            </select>
        </div>
    )
}
