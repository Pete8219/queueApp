import React, { useState, useEffect } from "react"
import { useHttp } from "../../../hooks/http.hook"
import { ListItem } from "./ListItem"
import { formatDate } from "../../../utils/formatDate"
import { Loader } from "../../Loader"
import { EditForm } from "../EditForm/EditForm"
import M from "materialize-css"
import { RewriteForm } from "../RewriteForm/RewriteForm"

export const List = ({ props }) => {
  useEffect(() => {
    M.AutoInit()
  }, [])

  /*      const rewriteBtn = document.getElementById('modalRewrite')
        if(rewriteBtn) {
            rewrite = M.Modal.getInstance(rewriteBtn)
        }   */

  const { userId, token, date, name } = props
  const { loading, request } = useHttp()
  const [ticketList, setTicketList] = useState([])
  const [editData, setEditData] = useState([])
  const [isActive, setIsActive] = useState(false)

  // let isActivModal = false

  useEffect(() => {
    if (!name) {
      return
    }
    const getTickets = async () => {
      try {
        const data = await request(`/tickets/find/${name}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        })
        setTicketList(data)
      } catch (error) {}
    }

    getTickets()
  }, [name, request, token])

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await request(`/tickets/ticketlist/${userId}/${formatDate(date)}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        })

        setTicketList(data)
      } catch (e) {}
    }

    getTickets()
  }, [date, userId, request, token])

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("ticketId"))
    openRModal()
  }, [isActive])

  const elem = document.getElementById("modalWindow")
  const instance = M.Modal.getInstance(elem)
  instance.open()

  const changeItem = (id) => {
    const filterData = ticketList.filter((item) => item._id === id)
    localStorage.setItem("ticketId", JSON.stringify(filterData))

    setEditData(filterData)
    instance.open()
  }

  const openRewrite = (id) => {
    const filterData = ticketList.filter((item) => item._id === id)
    localStorage.setItem("ticketId", JSON.stringify(filterData))
    //setIsActive((prev) => !prev)
  }

  const openRModal = () => {
    /*     let rewriteBtn = document.getElementById("modalRewrite")
    let instance = M.Modal.getInstance(rewriteBtn)
    instance.open() */
  }

  if (loading) {
    ;<Loader />
  }

  if (ticketList.length > 0) {
    return (
      <div className="row col s12">
        <div className="card" style={{ padding: "20px" }}>
          <table className="striped">
            <thead style={{ backgroundColor: "c2c2c2" }}>
              <tr>
                <th>#</th>
                <th>Посетитель</th>
                <th>Телефон</th>
                <th>Дата приема</th>
                <th>Время</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {ticketList.map((ticket, index) => {
                return <ListItem key={ticket._id} ticket={ticket} i={index} handler={changeItem} handleRewrite={openRewrite} />
              })}
            </tbody>
          </table>
        </div>

        <div id="modalWindow" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Редактирование записи</h4>
            <EditForm />
          </div>
        </div>
        {/*   { isActive  ? <RewriteForm /> : null  }  */}
      </div>
    )
  }

  return (
    <div>
      <h1>Записей не найдено</h1>
      <EditForm />
      {/*  { isActivModal ? <RewriteForm /> : null}  */}
    </div>
  )
}
