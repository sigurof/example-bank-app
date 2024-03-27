import {atomWithStorage} from "jotai/utils";


export const credentialsAtom = atomWithStorage("credentials", {
    username: '',
    password: ''
}, undefined, {
    getOnInit: true
})
