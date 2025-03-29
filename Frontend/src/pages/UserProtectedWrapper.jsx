import React, { use } from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem("token")
    const { user, setUser } = React.useContext(UserDataContext);
    const [ isLoading, setIsLoading ] =useState(true);
    

    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token){
            navigate("/login")
        }
    

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            const data = response.data
            setUser(data.user)
            setIsLoading(false)
        }
    }).catch((error) => {
        console.log(error)
        localStorage.removeItem("token")
         navigate("/login")
    })

  }, [token])

    if(isLoading){
        return <div>Loading...</div>
    }
    

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
