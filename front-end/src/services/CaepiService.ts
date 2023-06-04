import axios from "axios";
import { CONFIG } from "../util/config";
import { getUserStorage } from "./UserStorage";
import ICaepi from "../interface/ICaepi";

type Response = {
    status: number;
    data: ICaepi;
}

export function simpleFindCaepiByNumber(number : Number){
    return new Promise<Response>((resolve) => {
        axios.get(CONFIG.urlBase + '/api/v1/web-page/caepi/' + number, {
            headers: {
                'Authorization': CONFIG.tokenWebPage
            }
        })
        .then((res : any) => {
            resolve(res);
        })
        .catch((error : any) => {
            resolve(error);
        });
    });
}

export function findCaepiByNumber(number : Number){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();
        if(userStorage.email.length > 0){
            axios.get(CONFIG.urlBase + '/api/v1/caepi/' + number, {
                headers: {
                    'Authorization': 'Bearer ' + userStorage.token
                }
            })
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

export function findCaepiByLaboratory(cnpj : string, page : Number, size : Number){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();
        if(userStorage.email.length > 0){
            axios.get(`${CONFIG.urlBase}/api/v1/caepi/laboratory/${cnpj}?page=${page}&size=${size}`, {
                headers: {
                    'Authorization': 'Bearer ' + userStorage.token
                }
            })
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

export function findCaepiByManufacturer(cnpj : string, page : Number, size : Number){
    return new Promise((resolve) => {
        const userStorage = getUserStorage();
        if(userStorage.email.length > 0){
            console.log(`${CONFIG.urlBase}/api/v1/caepi/manufacturer/${cnpj}?page=${page}&size=${size}`);
            axios.get(`${CONFIG.urlBase}/api/v1/caepi/manufacturer/${cnpj}?page=${page}&size=${size}`, {
                headers: {
                    'Authorization': 'Bearer ' + userStorage.token
                }
            })
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