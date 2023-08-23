import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import ReviewOrder from "../components/ReviewOrder/ReviewOrder";
import Products from "../components/Products/Products";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Inventory from "../components/Inventory/Inventory";

export const route = createBrowserRouter([
    {
        path: "/", element: <Main></Main>, children: [
            { path: "/", element: <Products></Products> },
            {
                path: "/review-order",
                loader: () => fetch('http://localhost:5000/products'),
                element: <PrivateRoute><ReviewOrder></ReviewOrder></PrivateRoute>
            },
            {
                path: "/inventory",
                element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
            }
        ]
    },
    {
        path: "/login", element: <Login></Login>
    },
    {
        path: "/signup", element: <Signup></Signup>
    }
])