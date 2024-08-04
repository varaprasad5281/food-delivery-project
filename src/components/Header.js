import { useContext } from "react";
import { Link } from "react-router-dom";
// import UserContext from "../utils/UserContext";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";

const Header = () => {
  // const {userName}=useContext(UserContext)
  // subscribing our store using selector
  const cartItems=useSelector((store)=>store.cart.items)  //Reading the store
  console.log(cartItems)
  return (
    <div className="nav">
      <label className="logo">
        <Link className="logo">HONEY'S</Link>
      </label>
      <ul className="list-items">
        <Link>
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
        <Link to="/grocery">
          <li>Grocery</li>
        </Link>
        <Link to="/cart">
          <li>
            <span className="cart-icon">{cartItems.length}</span><BsCart />
          </li>
        </Link>
        {/* <Link to="/user">
          <li>
            <h3>{userName}</h3>
          </li>
        </Link> */}
      </ul>
    </div>
  );
};
export default Header;
