import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { findAllCustomers } from '../services/customers.service'
import { createInvoice } from '../services/invoices.service'

function FormInvoice() {
    const [credentials, setCredentials] = useState({})
    const [customers, setCustomer] = useState([])
    const navigate = useNavigate()

    const handleChange = ({ currentTarget }) => {
        let { name, value } = currentTarget
        if (name === "customer") {
            value = `/api/customers/${value}`
        }
        if (name === "amount") {
            value = parseInt(value)
        }
        setCredentials(
            {
                ...credentials,
                [name]: value
            }
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await createInvoice(credentials)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAll = async () => {
        try {
            const data = await findAllCustomers()
            setCustomer(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="amount" name="amount" onChange={handleChange} />
            <select id="status" name="status" onChange={handleChange}>
                <option disabled selected value> -- select a status -- </option>
                <option value="SENDING">SENDING</option>
                <option value="CANCEL">CANCEL</option>
                <option value="CLOSE">CLOSE</option>
            </select>
            <input type="date" id="start" onChange={handleChange} name="sendingAt" min="2021-01-01" max="2023-12-31" />
            <select id="status" name="customer" onChange={handleChange}>
                <option disabled selected value> -- select a customer -- </option>
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.companyName}</option>
                ))}
            </select>
            <input type="submit" />
        </form>
    )
}

export default FormInvoice