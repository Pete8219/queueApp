import React from 'react'

export const RadioSelect = ({...props}) => {
    
    return (
        <>
            
                <p>
                <label>
                    <input name={props.group} type={props.type} data-stype={props.data} value={props.value} onClick = {props.onChange} />
                    <span>{props.value}</span>
                </label>
                </p>
                
        </>
    )
}
