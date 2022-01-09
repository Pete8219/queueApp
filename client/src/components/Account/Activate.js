import React, { useEffect, useState } from 'react'
import {Loader} from '../Loader'
import { useHistory, useParams } from 'react-router-dom'

import api from '../../http'
import axios from 'axios'



export const Activate = () => {
    

    const { code } = useParams()
    
    console.log(code)
    


    useEffect(() => {
        axios.get(`/auth/activate/${code}`)
    },[ code ])


        return (
        <div>
            
        </div>
    )
}