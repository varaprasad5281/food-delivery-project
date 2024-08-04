import { useSelector } from "react-redux";
import ItemList from "./ItemList";

const Cart=()=>{
    const cartItems=useSelector((store)=>store.cart.items)
    return(
        <div>
            <h1>This is cart page</h1>
            <ItemList items={cartItems}/>
        </div>
    )
}
export default Cart;