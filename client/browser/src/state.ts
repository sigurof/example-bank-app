import {atomWithStorage} from "jotai/utils";


export const credentialsAtom = atomWithStorage("credentials", {
    email: '',
    password: ''
}, undefined, {
    getOnInit: true
})
