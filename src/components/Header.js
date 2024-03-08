import { Link } from "react-router-dom";
const Header=()=>{
    return(
        <div className="nav">
            <h1><Link className="logo">Prasad's</Link></h1>
            <ul className="list-items">
                <Link><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/contact"><li>Contact</li></Link>
                <Link to="/cart"><li>Cart</li></Link>
                
            </ul>
        </div>
    )
}
export default Header;
