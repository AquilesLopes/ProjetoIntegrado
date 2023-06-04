import { IUser } from "../interface/IUser";
import { emptyUser } from "../util/util";

export function setUserStorage(user : IUser){
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserStorage(){
    localStorage.removeItem('user');
}

export function getUserStorage() : IUser {
    try {
        const json = localStorage.getItem('user');
        const obj = json !== null ? JSON.parse(json) : '';

        var user = emptyUser();

        user.firstname = obj.firstname;
        user.lastname = obj.lastname;
        user.email = obj.email;
        user.token = obj.token;
        user.iconImage64 = obj.iconImage64;

        if(user.firstname === undefined || user.email === undefined){
            return emptyUser();
        }

        return user;
    } catch (ex) {
        return emptyUser();
    }
}