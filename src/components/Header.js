import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="nav">
      <h1>
        <Link className="logo">HONEY'S</Link>
      </h1>
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
