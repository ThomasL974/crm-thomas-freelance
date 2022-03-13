import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Invoices</Link>
            <Link to="/customers">Customers</Link>
        </nav>
    );
}

export default Navbar;