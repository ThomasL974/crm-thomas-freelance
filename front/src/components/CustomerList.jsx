import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteCustomer, findAllCustomers } from "../services/customers.service"

const CustomerList = () => {
    const [customers, setCustomer] = useState([])

    const fetchAll = async () => {
        try {
            const data = await findAllCustomers()
            setCustomer(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async(id)=>{
        console.log(id)
        try {
            const data = await deleteCustomer(id);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAll()
    }, [handleDelete])
    return (
        <div>
            <Link to="/customers/create" >Create customer</Link>
            <table>
                <thead>
                    <tr>
                        <th>email</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.email}</td>
                            <td>{customer.companyName}</td>
                            <td><button onClick={ () => handleDelete(customer.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;