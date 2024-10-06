import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Contact } from "./components/Contact";
import Error from "./components/Error";
import Footer from "./components/Footer";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const Grocery = lazy(() => import("./components/Grocery"));
const App = () => {
  return (
    <Provider store={appStore}>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};
export default App;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurants/:resId", //Where resId represents the dynamic routing of each and individual restaurants
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
