export const api = {

    login: async (email: string, password: string) => {
        console.log('api.login', email, password)
        if (email === 'fail') throw 'Login failed'
        return "token"

    }




}
