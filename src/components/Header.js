import { Link } from "react-router-dom";
const Header=()=>{
    return(
        <div className="nav">
            <h1>Prasad's</h1>
            <ul className="list-items">
                <Link><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/contact"><li>Contact</li></Link>
                <Link to="/register"><li>Register Now</li></Link>
                
            </ul>
        </div>
    )
}
export default Header;
