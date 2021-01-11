import React from 'react'


export const ReceptionTime = ({date,  shortDay}) => {
    return (
        <div>
        <p>таблица времени приема на {date}</p>
        <p>короткий день? { shortDay === 'true' ? 'Да' : 'Нет'}</p>
        </div>
    )
}