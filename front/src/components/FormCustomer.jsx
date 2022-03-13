import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createCustomer } from '../services/customers.service'

function FormCustomer() {
    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate()

    const handleChange =({currentTarget})=>{
        const {name, value} = currentTarget
        setCredentials(
            {
                ...credentials,
                [name]: value
            }
        )
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const data = await createCustomer(credentials)
            navigate('/customers')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form >
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="text" placeholder="Company name" name="companyName" onChange={handleChange} />
            <input type="submit" onClick={handleSubmit} />
        </form>
    )
}

export default FormCustomer