import axios, { AxiosResponse } from "axios";
import { IUser } from "../interface/IUser";
import { CONFIG } from "../util/config";
import { emptyUser } from "../util/util";
import { getUserStorage, setUserStorage } from "./UserStorage";

export function loginService(email: string, password: string){
    return new Promise((resolve) => {
        axios.post(CONFIG.urlBase + '/api/v1/auth/login', {
            email: email,
            password: password
        })
        .then((res : any) => {
            const userLoged = {
              firstname: "",
              lastname: "",
              email: email,
              token: res.data.accessToken
            }

            setUserStorage(userLoged);
            resolve(200);
        })
        .catch((error : any) => {
            resolve(401);
        });
    });
}

export function getUserLogged(){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();
        if(userStorage.email.length > 0){
            axios.get(CONFIG.urlBase + '/api/v1/user/' + userStorage.email, {
                headers: {
                    'Authorization': 'Bearer ' + userStorage.token
                }
            })
            .then((res : any) => {
                resolve(res);
            })
            .catch((error : any) => {
                const userEmpty : IUser = emptyUser();
                setUserStorage(userEmpty);
                resolve(error);
            });
        }else {
            resolve({status: 401, msg: ''});
        }
    });
}

export function createUser(user : IUser){
    return new Promise<AxiosResponse>((resolve) => {
        const configResquest = { 
            url: `${CONFIG.urlBase}/api/v1/user/register`,
            method: 'POST',
            headers: { 
                Authorization: `${CONFIG.tokenWebPage}` 
            },
            data: user
        };

        axios.request(configResquest)
        .then((res : any) => {
            resolve(res);
        })
        .catch((error : any) => {
            resolve(error);
        });
    });
}

export function updateUserLogged(firstname : string, lastname : string, email : string){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();

        if(userStorage.email.length > 0){
            const configResquest = { 
                url: `${CONFIG.urlBase}/api/v1/user`,
                method: 'PUT',
                headers: { 
                    Authorization: `Bearer ${userStorage.token}` 
                },
                data: { firstname, lastname, email }
            }

            axios.request(configResquest)
            .then((res : any) => {
                resolve(res);
            })
            .catch((error : any) => {
                resolve(error);
            });
        }else {
            resolve({status: 401, msg: ''});
        }

    });
}

export function updateIconImage64(iconImage64 : string){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();

        if(userStorage.email.length > 0){
            const configResquest = { 
                url: `${CONFIG.urlBase}/api/v1/user/icon-image-64`,
                method: 'PUT',
                headers: { 
                    Authorization: `Bearer ${userStorage.token}` 
                },
                data: { iconImage64 }
            }

            axios.request(configResquest)
            .then((res : any) => {
                resolve(res);
            })
            .catch((error : any) => {
                resolve(error);
            });
        }else {
            resolve({status: 401, msg: ''});
        }

    });
}

export function updatePassword(oldPassword : string, newPassword : string){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();

        if(userStorage.email.length > 0){
            const configResquest = { 
                url: `${CONFIG.urlBase}/api/v1/user/password`,
                method: 'PUT',
                headers: { 
                    Authorization: `Bearer ${userStorage.token}` 
                },
                data: { oldPassword, newPassword }
            }

            axios.request(configResquest)
            .then((res : any) => {
                resolve(res);
            })
            .catch((error : any) => {
                resolve(error);
            });
        }else {
            resolve({status: 401, msg: ''});
        }

    });
}