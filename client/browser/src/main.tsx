import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.tsx";

const router = createBrowserRouter([
    {
        path: '/landing/login',
        element: <LoginPage/>
    },
    // {
    //     path: '/landing/register',
    //     element: <RegisterPage/>
    // },
    // {
    //     path: '/client',
    //     element: <ClientPage/>
    // }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
