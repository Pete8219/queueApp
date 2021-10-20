import React, { useState } from 'react'

export const RadioSelect = ({...props}) => {
    
    return (
        <>
            
                <p>
                <label>
                    <input name={props.group} type={props.type} value={props.value} onClick = {props.onChange} />
                    <span>{props.value}</span>
                </label>
                </p>
                
        </>
    )
}
