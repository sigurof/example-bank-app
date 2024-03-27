import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.tsx";
import {LinksPage} from "./pages/LinksPage.tsx";
import {ErrorPage} from "./pages/ErrorPage.tsx";
import {ClientPages} from "./pages/ClientPages.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LinksPage/>,
        errorElement: <ErrorPage/>
    },
    {

        path: "/client",
        element: <ClientPages/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/landing/login',
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
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
