
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./views/Auth/Login";
import { Register } from "./views/Auth/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Terrible pvton</h1>,
    },
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ]
    }
]);

export default router;
