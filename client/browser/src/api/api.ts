export const api = {

    login: async (email: string, password: string) => {
        console.log('api.login', email, password)
        if (email === 'fail') throw 'Login failed'
        return "token"

    },
    register(email: string, password: string) {
        console.log('api.register', email, password)
        if (email === 'fail') throw 'Register failed'
    }
}

export const accounts = [
    {
        type: "checking",
        id: "123",
        number: "1205 44 12345",
        name: "Main Account",
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
