import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteInvoice, findAllInvoices } from "../services/invoices.service";

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([])

    const fetchAll = async () => {
        try {
            const data = await findAllInvoices()
            setInvoices(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (id) => {
        console.log(id)
        try {
            const data = await deleteInvoice(id);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAll()
    }, [handleDelete])
    return (
        <>
            <Link to="/invoices/create" >Create Invoice</Link>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.amount}</td>
                            <td>{invoice.status}</td>
                            <td>{invoice.customer.companyName}</td>
                            <td><button onClick={() => handleDelete(invoice.id)}>DELETE</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default InvoiceList;