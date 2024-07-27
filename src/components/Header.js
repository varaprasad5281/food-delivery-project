import { Link } from "react-router-dom";
const Header = () => {
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
            <span className="cart-icon">0</span>Cart
          </li>
        </Link>
      </ul>
    </div>
  );
};
export default Header;
