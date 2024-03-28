import axios from "axios";

// const client = axios.create({
//     baseURL: 'http://localhost:8080/',
//     timeout: 2000,
// })

const authenticatedClient = axios.create({
    baseURL: 'http://localhost:8080/',
    // timeout: 2000,
    withCredentials: true
})

export interface SessionInvalidEvent extends Event {
    detail: string;
}

authenticatedClient.interceptors.response.use(
    response => response,
    error => {
        const status = error.response.status
        // Check for session invalidation specifically
        console.log(`Error status: ${error.response.status} `)
        if (status === 401) {
            // Specific logic for invalid session
            // console.log('Session invalid. Logging out...');
            const event = new CustomEvent('sessionInvalid', {
                detail: '/landing/login'
            });
            window.dispatchEvent(event);
            // Logout logic here
        } else if (status === 403) {
            // Handle insufficient permissions without logging out
            console.log('Access denied. Insufficient permissions.');
        }
        return Promise.reject(error);
    }
);


type EmailPassword = { email: string, password: string };
export const api = {

    login: async ({email, password}: EmailPassword) => {
        return authenticatedClient.post('/logIn', {email, password})

    },
    register({email, password}: EmailPassword): Promise<void> {
        return authenticatedClient.post('/signUp', {email, password})
    },

    getAccounts: async (): Promise<Account[]> => {
        return await authenticatedClient.get("/accounts")
            .then(response => response.data)
    },

    createAccount: async (account: Partial<Account>): Promise<Account> => {
        return await authenticatedClient.post("/accounts", account)
            .then(response => response.data)
    }
}

export const accounts = [
    {
        id: "123",
        name: "Main Account",
        type: "checking",
        number: "1205 44 12345",
        balance: 1000,
    },
    {
        type: "bsu",
        id: "124",
        number: "1205 44 12345",
        name: "BSU Account",
        balance: 10000,
    },
    {
        type: "savings",
        id: "127",
        number: "1205 44 12345",
        name: "Spare Italiatur",
        balance: 56000,
    },
    {
        type: "credit",
        id: "125",
        number: "1205 44 12345",
        name: "Credit Card",
        balance: -1000,
        limit: 10000
    },
    {
        type: "loan",
        id: "126",
        number: "1205 44 12345",
        name: "Mortgage",
        balance: -100000,
    }
]
export type Account = typeof accounts[0]
