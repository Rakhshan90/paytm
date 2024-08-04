import { baseURL } from "@/util/baseURL";
import axios from "axios";
import { atom, atomFamily, selector } from "recoil";


export const firstNameAtom = atom({
    key: 'firstNameAtom',
    default: '',
});
export const lastNameAtom = atom({
    key: 'lastNameAtom',
    default: '',
});
export const usernameAtom = atom({
    key: 'usernameAtom',
    default: '',
});
export const passwordAtom = atom({
    key: 'passwordAtom',
    default: '',
});

export const signUpAtom = atomFamily({
    key: 'signUpAtom',
    default: selector({
        key: 'signUpSelector',
        get: userData => async({get}) => {
            const res = await axios.post(`${baseURL}/api/v1/user/signup`, userData);
            return res.data;
        }
    })
});