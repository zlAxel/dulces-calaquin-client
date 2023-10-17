
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./views/Auth/Login";

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
                element: <h1>Register</h1>,
            }
        ]
    }
]);

export default router;
