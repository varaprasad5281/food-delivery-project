import React  from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import {
  createBrowserRouter,RouterProvider,Outlet
} from "react-router-dom";
import { Contact } from './components/Contact';
import Error from './components/Error';
import Footer from './components/Footer';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
const App=()=> {

  return (
    <div className="App">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}
export default App
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Body/>,
      },
      {
        path:"/about",
        element:<About/>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/restaurants/:resId", //Where resId represents the dynamic routing of each and individual restaurants
        element:<RestaurantMenu/>
      }
    ],
  errorElement:<Error/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);