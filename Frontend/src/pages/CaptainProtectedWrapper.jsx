// import React, { use } from 'react'
// import { CaptainDataContext } from '../context/CaptainContext'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { useState } from 'react'

// const CaptainProtectedWrapper = ({children}) => {
//     const token = localStorage.getItem("token")
//     const { captain, setCaptain } = React.useContext(CaptainDataContext);
//     const [ isLoading, setIsLoading ] =useState(true);
    

//     const navigate = useNavigate()
    
//     useEffect(() => {
//         if(!token){
//             navigate("/captainlogin")
//         }
    

//    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).then((response) => {
//         if(response.status === 200){
//             const data = response.data
//             setCaptain(data.captain)
//             setIsLoading(false)
//         }
//     }).catch((error) => {
//         console.log(error)
//         localStorage.removeItem("token")
//          navigate("/captainlogin")

//     })
//   }, [token])

//     if(isLoading){
//         return <div>Loading...</div>
//     }

//   return (
//     <>
//     {children}
//     </>
//   )
// }

// export default CaptainProtectedWrapper

import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)




    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/captainlogin')
            })
    }, [ token ])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper