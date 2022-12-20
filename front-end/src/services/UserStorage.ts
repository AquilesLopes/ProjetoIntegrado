import { IUser } from "../interface/IUser";

export function setUserStorage(user : IUser){
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserStorage(){
    localStorage.removeItem('user');
}

export function getUserStorage() : IUser | null{
    const json = localStorage.getItem('user');
    if(json !== null){ 
        const obj = JSON.parse(json);
        return {
            name: obj.name,
            email: obj.email,
            lastname: obj.lastname
        };
    }else{
        return null;
    }
}