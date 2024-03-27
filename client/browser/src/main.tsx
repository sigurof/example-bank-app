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
import {Accounts} from "./pages/client/accounts/Accounts.tsx";
import "./main.css"
import {Transfer} from "./pages/client/transfers/Transfer.tsx";
import {Loans} from "./pages/client/loans/Loans.tsx";

export const paths = {
    ROOT: "/",
    CLIENT: "/client",
    ACCOUNTS: "/client/accounts",
    TRANSFER: "/client/transfer",
    LOANS: "/client/loans",
}
const router = createBrowserRouter([
    {
        path: paths.ROOT,
        element: <LinksPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: paths.CLIENT,
        element: <ClientPages/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: paths.CLIENT,
                element: <div>Home</div>
            },
            {
                path: paths.ACCOUNTS,
                element: <Accounts/>
            },
            {
                path: paths.TRANSFER,
                element: <Transfer/>
            },
            {
                path: paths.LOANS,
                element: <Loans/>
            },
        ]
    },
    {
        path: '/landing/login',
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
