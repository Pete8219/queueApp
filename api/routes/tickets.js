const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const auth = require('../middleware/auth.middleware')
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

const Ticket = require("../models/tickets")
const Service = require("../models/services")

const { check, validationResult } = require("express-validator")
//const { request } = require("express")


//Получение списка тикетов из базы. Надо поработать с аутентификацией или выбирать только некоторые поля при запросе, иначе любой может получить данные посетителей
router.get("/", auth, (req, res, next) => {
  Ticket.find({})
    .exec()
    .then((tickets) => {
      res.status(200).json({
        tickets,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

// Сохранение пользователя в базе. Проводятся проверки на запонение полей формы

//Наверное нужно сделать проверку на наличие параметров в запросе : service, date, time, user
router.post("/", [check("firstname", "Введите фамилию").trim().toUpperCase().isLength({ min: 2 }), check("lastname", "Введите Имя").trim().toUpperCase().isLength({ min: 2 }), check("phone", "Введите номер телефона").not().isEmpty().trim(), check("phone", "Вы ввели некорректный номер. Длина номера должна быть от 5 до 11 знаков").isLength({ min: 5, max: 11 })/* , check("phone", "Номер телефона должен содержать только цифры").isNumeric() */], async (req, res) => {

  const { date, hours, minutes } = req.body
  
  receptionDate = new Date(date.split('.').reverse().join('-'))
  receptionDate.setHours(hours)
  /* receptionDate.setHours(receptionDate.getHours() + 5) */
  receptionDate.setMinutes(minutes)

  req.body.date = receptionDate
  

  const { surname } = req.body
  const { ticketId } = req.body
  if (surname) {
    req.body.surname = surname.toUpperCase()
  }
  

  


  const query = {
    time: req.body.time,
    user: req.body.employee,
    date: req.body.date,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    surname: req.body.surname,
    phone: req.body.phone,
    email: req.body.email,
    service: req.body.serviceId
  }

  try {
    const errorFormatter = ({ msg }) => {
      return `${msg}`
    }
    const errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      })
    }

    const isExist = await Ticket.findOne({ $and: [{ date: req.body.date }, { user: req.body.employee}] })
    
//


    if(ticketId){
      
      const isExistId = await Ticket.findOne({_id: ticketId })
      if(isExistId) {
        try {
           const data = await Ticket.replaceOne({_id: ticketId}, {...query})
            return res.status(200).json({
              message: 'Запись измененена'
        })
        } catch(e) {
          res.status(500).json({
            message: 'Что то пошло не так'
          })
        }
       
      }

    }
    //

    if (isExist) {
      return res.status(400).json({
        message: "К сожалению, на данное время только что записались"
      })
    }

    const ticket = new Ticket({ ...query })
    await ticket.save()
    res.status(201).json({
      message: "Ваша заявка принята",
    })
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    })
  }
})


//Отправка письма заявителю
router.post("/send", async(req, res) => {
  

  const output = `
    <p>Запись на прием в управление жилищной политики Администрации МО город Салехард<p>
    <h3>Информация о записи<h3>
    <ul>
      <li>${req.body.ticketNumber}</li>
      <li>${req.body.service}</li>
      <li>${req.body.visitor}</li>
      <li>${req.body.date}</li>
      <li>${req.body.timeToReceipt}</li>
      <li>Приём проводится по адресу: ул Броднева, д. 28, ${req.body.cab}</li>
      <li>${req.body.employee}</li>
      <li>Дата регистрации:  ${req.body.registered}</li>

    </ul>
  `

  const email = req.body.email

  // скрипт от правки письма получателю
  try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, // generated ethereal user
          pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Электронная очередь" <itu@salekhard.org>', // sender address
        to: email, // list of receivers
        subject: "Запись на прием", // Subject line
        html: output, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json({
        message: 'На ваш Email отправлена информации о приеме'
      })

  } catch(e) {
    res.status(500).json({
      message: "Возникла ошибка при отправке почтового сообщения"
    })
  }
})

router.post("/reservation", async(req,res) => {
  try {
    
  } catch (error) {
    
  }
})

//Поиск тикетов по фамилии посетителя

//Здесь нужно сделать проверку авторизации!!!!

router.get("/find/:visitor", auth, async (req, res) => {
  console.log(req.params)
  
 
  try {
     const data = await Ticket.find({firstname : req.params.visitor})
      .populate({
        path: 'user',
        select:'name cabinet'
      })
     

    res.status(200).json(data)
    

  } catch (e) {
    res.status(500).json({
      message: 'Что то пошло не так'
    })
  }
})


//Поиск тикетов по ID сотрудника и дате
router.get("/:employeeId/:date", async(req, res) => {
     

  const startDate = new Date(req.params.date)
  const endDate = new Date(req.params.date)
  endDate.setHours(23,59,0,0)

     try {
       const tickets = await Ticket.find({$and: [{ date: {$gte : startDate, $lte: endDate}}, {isBusy: true}, { user: req.params.employeeId } ]}).select('time date serviceType')
/*        if(!tickets.length) {
        return  res.status(200).json(
           
          { message: "Пока еще все свободно"}
         )
       }
 */
       res.status(200).json(tickets)
     } catch (e) {
       res.status(500).json({
         message: "Ошибка выполнения запроса"
       })
       
     }
})

router.get("/checkTime/:employeeId/:time/", async (req, res) => {
  console.log(req.params.time)
  const time = req.params.time
  const startDate = new Date()
  startDate.setHours(5,0,0,0)
  const endDate = new Date()
  endDate.setHours(23,59,0,0)

  console.log(startDate, endDate)

  try {
    const tickets = await Ticket.find({$and: [{ date: {$gte : startDate, $lte: endDate} }, { user : req.params.employeeId }]}).select('date')
       
    const checking =  tickets.filter(ticket => {
       return (ticket.date.toTimeString().slice(0,5) === time && ticket.isBusy === true)
      
    }) 

    if(!checking.length) {

      //Вариант с резервацией времени при выбоое времени. Посмотрим понадобиться или нет
/*       const hours = time.slice(0,2)
      const minutes = time.slice(3,5)
      const day = new Date()
      day.setHours(hours)
      day.setMinutes(minutes,0,0)
      
      const reserv = new Ticket({user: req.params.employeeId, date: day, isBusy:true })
      reserv.save() */
    }
    

    res.status(200).json(checking)
  } catch (e) {
    res.status(500).json({
      message: "Ошибка выполнения запроса"
    })
    
  }

})

//Выбор тикетов для пользователя за определенную дату
//Здесь нужно сделать проверку авторизации!!!!

router.get("/ticketlist/:userId/:date",   auth,  async(req, res) => {
  
  const startDate = new Date(req.params.date)
  startDate.toISOString()

  const endDate = new Date(req.params.date)

  endDate.setHours(23,59,0,0)


  try {
    const tickets = await Ticket.find({ $and : [{user: req.params.userId}, { date: {$gte : startDate, $lte: endDate} }]})
        .populate(
          {
            path: 'user',
            select: 'name cabinet'
            })
    res.status(200).json(tickets)
    } catch(e) {
    res.status(500).json({
      message:'Что то пошло не так'
    })
  }

})

//Выборка тикета по ID

router.get("/:ticketId", auth, async(req, res) => {

    const id = req.params.ticketId

    try {
      const ticket = await Ticket.findOne({_id: id})

      return res.status(200).json(ticket)
      
    } catch (e) {
        res.status(500).json({
          message: "Ошибка запроса"
        })
    }

})




//Выбор тикетов по id-услуги, за заданный промежуток времени. Используется при формировании времени приема 

//Здесь нужно сделать проверку авторизации!!!!
router.get("/byService/:serviceId/:date/:userId", async(req, res) => {


 
  const startDate = new Date(req.params.date)
  startDate.toISOString()

  const endDate = new Date(req.params.date)

  endDate.setHours(23,59,0,0)

  try {
    const tickets = await Ticket.find({ 
      $and : [
        {service: req.params.serviceId},
        {user: req.params.userId},
        {date: {$gte : startDate, $lte: endDate} 
      }]
    })
    
    console.log(tickets)
    res.status(200).json(tickets)
    } catch(e) {
    res.status(500).json({
      message:'Что то пошло не так'
    })
  }

})



// Выбор тикетов в зависимости от статуса

//Здесь нужно сделать проверку авторизации!!!!

router.get("/status",auth, async (req, res) => {
  try {
    const statusData = await Ticket.find({})
    res.status(201).json(statusData.getStatus)
    
  } catch (e) {
    res.status(500).json({
      message: "Что то не так",
    })
  }
})

router.patch("/:id", auth, async(req, res) => {

  try {
    
    const updateOps = {}
    for (let key in req.body) {
      updateOps[key] = req.body[key]
    }

    await Ticket.updateOne({_id: req.params.id}, { $set: updateOps})

    res.status(200).json({
      message: "Данные по записи успешно обновлены"
    })
  } catch (e) {
    res.status(500).json({
      message:"Ошибка обновления информации о талоне. Попробуйте еще раз или обратитесь к разработчику"
    })
  }
})

//Обновление информации о записи
//Здесь нужно сделать проверку авторизации!!!!

router.patch("/status/:ticketId", auth, async (req, res, next) => {
  console.log(req.body)

  
  try {
        const id = req.params.ticketId

        const updateOps = {}

        for (let key in req.body) {
          updateOps[key] = req.body[key]
        }

        if(req.body.statusValue === 'refusal') {
          updateOps['isBusy'] = false
        } else {
          updateOps['isBusy'] = true
        }

        

        await Ticket.updateOne({ _id: id }, { $set: updateOps })
        
        res.status(200).json({

          message: `Статус заявления изменен на: "${req.body.status}"`
      })
} catch (e) {
  res.status(500).json({
    message: "Произошла ошибка. Обратитесь к разработчику"
  })
}


})

router.patch("/notes/:ticketId", auth, async (req, res, next) => {


  console.log(req.body)
   try {
      const id = req.params.ticketId
      const updateOps = {}

      for (let key in req.body) {
        updateOps[key] = req.body[key]
      }

      //console.log(updateOps)

      await Ticket.updateOne({ _id: id }, { $set: updateOps })

      res.status(200).json({
        message: `Информация о заявлении обновлена`
      })
     
   } catch (e) {
     res.status(400).json({
       message: "Произошла ошибка. Обратитесь к разработчику"
     })
     
   }
})




//Удаление выбранного талона
//Здесь нужно сделать проверку авторизации!!!!

router.delete("/:ticketId", auth, (req, res) => {
  res.status(200).json({
    message: "Ticket deleted",
  })
})

module.exports = router
