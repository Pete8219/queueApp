import React from "react"

export const UserTickets = ({ tickets, status, handleChange }) => {
  const date = new Date()

  const statusList = ["В работе", "Отработан", "Отказ", "Уточнение сведений"]

  return (
    <div className="row col-s12">
      <blockquote>Список посетителей на {date.toLocaleDateString()}</blockquote>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Посетитель</th>
            <th>Время</th>
            <th>Статус</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => {
            const fullName = `${ticket.lastname} ${ticket.firstname} ${ticket.surname}`
            return (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{fullName}</td>
                <td>{ticket.date.slice(11, 16)}</td>
                <td>
                  <select className="browser-default" value={status.value} onChange={handleChange}>
                    {statusList.map((item, i) => {
                      return (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      )
                    })}

                    {/* <option value="В работе">В работе</option>
                    <option value="Отработан">Отработан</option>
                    <option value="Уточнение сведений">Уточнение сведений</option>
                    <option value="Отказ">Отказ</option> */}
                  </select>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
