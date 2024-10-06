import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  //
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="res-menu">
      <h1>Your cart items</h1>
      <div>
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear Cart
        </button>

        {cartItems.length === 0 ? (
          <h1>There No Items were Added</h1>
        ) : (
          <ItemList items={cartItems} />
        )}
      </div>
    </div>
  );
};
export default Cart;
