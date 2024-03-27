import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage.tsx";
import {ErrorPage} from "./pages/ErrorPage.tsx";
// import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ClientPages} from "./pages/ClientPages.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Accounts} from "./pages/client/accounts/Accounts.tsx";
import "./main.css"
import {Transfer} from "./pages/client/transfers/Transfer.tsx";
import {Loans} from "./pages/client/loans/Loans.tsx";
import {Parent} from "./pages/Parent.tsx";
import {LandingPagesOutlet} from "./pages/landing/LandingPagesOutlet.tsx";
import {LoginPage} from "./pages/landing/LoginPage.tsx";
import {RegisterPage} from "./pages/landing/RegisterPage.tsx";

export const paths = {
    ROOT: "/",
    CLIENT: "/client",
    ACCOUNTS: "/client/accounts",
    TRANSFER: "/client/transfer",
    LOANS: "/client/loans",
}
const clientPage = {
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
};
const landingPages = {
    path: '/landing',
    element: <LandingPagesOutlet/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: '/landing/login',
            element: <LoginPage/>
        }, {
            path: '/landing/register',
            element: <RegisterPage/>
        }
    ]
};
const router = createBrowserRouter([
    {
        path: paths.ROOT,
        element: <LinksPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: paths.ROOT,
        element: <Parent/>,
        errorElement: <ErrorPage/>,
        children: [
            clientPage,
            landingPages
        ]
    }
])

// const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<QueryClientProvider client={queryClient}>*/}
        <RouterProvider router={router}/>
        {/*</QueryClientProvider>*/}
    </React.StrictMode>,
)
