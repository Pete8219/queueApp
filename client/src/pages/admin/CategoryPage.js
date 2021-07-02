import React, { useEffect, useState, useContext} from 'react'
import { useHttp } from "../../hooks/http.hook"
import { List } from '../../components/Category/List'
import { Create } from '../../components/Category/Create'
import { Detail } from '../../components/Category/Detail'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'
 
export const CategoryPage = () => {
    const [categories, setCategories] = useState([])
    const [active, setActive] = useState('List')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState("")

    const {loading, request} = useHttp()
    const message = useMessage()
    const { token } = useContext(AuthContext)


    useEffect(()=> {
        const fetchCategories = async() => {
            try {

                const fetched = await request('/categories', "GET", null, {})
                setCategories(fetched)

            } catch (e) {}
        }

        fetchCategories()
    },[request, active])

    const deleteHandler = async (id) => {
        const data = await request(`/categories/${id}`, "DELETE", null, { Authorization: `Bearer ${token}`})
        message(data.message)
        
        setCategories(categories.filter(({ _id }) => id !== _id))
      }
    


    
    const editHandler = async (id, status) => {
            setActive(status)
            const data = await request(`/categories/${id}`, "GET", null, {})
            message(data.message)
            setCategory(data)
            setTitle(data.title)
                  
      }
    
      const statusHandler = (status) => {
          setActive(status)
        
      }

      const saveCategoryHandler = async()=> {
        try {
            const data = await request("/categories", "POST", {title}, { Authorization: `Bearer ${token}` })
            message(data.message)
            setActive("List")
          } catch (e) {}

      }

      const updateCategoryHandler = async (id) => {
        try {
            const data = await request(`/categories/${id}`, 'PATCH', {title}, { Authorization: `Bearer ${token}`})

            message(data.message)
            setActive('List')


        } catch (e) {}

      }

      const cancelHandler = ()=> {
          setActive('List')
      }

      const changeTitle = (event) => {
          setTitle(event.target.value)
      }



    return (
       <>
        {!loading  && active === "List" &&  <List categories={categories} create={statusHandler} edit={editHandler} OnDelete={deleteHandler}/>}
        {active=== 'Create' && <Create save={saveCategoryHandler} cancel={cancelHandler} changeTitle={changeTitle}/>}
        {!loading && category && active === 'Detail'  && <Detail category={category} title={title} cancel={cancelHandler} changeTitle={changeTitle} update={updateCategoryHandler}/>}
       </>
    )
}