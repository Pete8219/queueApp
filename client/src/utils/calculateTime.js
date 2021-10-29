import { usehttp } from "../hooks/http.hook"
import { formatDate } from "./formatDate"


export const calculateTime = async (date, type) => {
    import "./styles.css";


const timer = []
timer.length = 3*60/15


const recTime = (new Date('2021', '9', '27', '14', '15','00')).toLocaleTimeString().slice(0,5)

const recTime1 = (new Date('2021', '9', '27', '15', '15','00')).toLocaleTimeString().slice(0,5)

const recTime2 = (new Date('2021', '9', '27', '16', '00','00')).toLocaleTimeString().slice(0,5)

const sType = 'consult'

const tickets = [recTime, recTime1, recTime2]




for ( let i = 0; i < timer.length; i++) {
  let today = new Date()
  today.setHours(14)
  timer[i] = {
    isBusy: false,
    time : (new Date(today.setMinutes(i*15))).toLocaleTimeString().slice(0,5)
  }

}

tickets.map((record) => mapping(record))

function mapping(record) {
  timer.map((item, index) => {
    if(item.time === record) {
      
      calculate(index)
  
    }
  })
 
}

function calculate(index) {
  if (sType === 'submission') {
      const k = 4;
      for (let i = 0; i< k; i++) {
        timer[index + i].isBusy = true 
      }
  }

  if (sType === 'consult') {
    timer[index].isBusy = true
  }
}

const openRecord = timer.filter(item => item.isBusy === false)
    return tickets
}