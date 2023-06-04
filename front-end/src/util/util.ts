import { IUser } from "../interface/IUser";
import { removeCaepiStorage } from "../services/CaepiStorage";
import { removeUserStorage } from "../services/UserStorage";
import { CONFIG } from "./config";

export const isMobile : boolean = window.innerWidth <= 600;

export function formatDate(dateStr : string){
    try{ 
        const date = new Date(dateStr);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        let dateFormat = '';

        dateFormat += dd > 9 ? dd : '0' + dd;
        dateFormat += '/';
        dateFormat += mm > 9 ? mm : '0' + mm;
        dateFormat += '/' + yyyy;
        return dateFormat;
    } catch (e){
        return '';
    }
}

export function formatDateTime(dateStr : string){
    try{ 
        const date = new Date(dateStr);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let HH = date.getHours();
        let MM = date.getMinutes();

        let dateFormat = '';

        dateFormat += dd > 9 ? dd : '0' + dd;
        dateFormat += '/';
        dateFormat += mm > 9 ? mm : '0' + mm;
        dateFormat += '/' + yyyy;
        dateFormat += " ";
        dateFormat += HH > 9 ? HH : '0' + HH;
        dateFormat += ":";
        dateFormat += MM > 9 ? MM : '0' + MM;
        return dateFormat;
    } catch (e){
        return '';
    }
}

export function caepiValid(statusCaepi : string){
    try{ 
        let status = statusCaepi.toUpperCase().trim();
        if(status === 'VÁLIDO' || status === 'VALIDO'){
           return true; 
        }else{
            return false; 
        }
    } catch (e){
        return false;
    }   
}

export function scroollById(idName: string) {
    if(idName != null && idName != "") {
        document.getElementById(idName)?.scrollIntoView(
            { 
                behavior: "smooth" 
            }
        );
    }else{
        console.log("Invalid element with id: " + idName);
    }
}

export const styleModal = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    backgroundColor: '#FAFAFA',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '98%' : '40%',
    bgcolor: 'background.paper',
    color: '#000',
    border: '2px solid #188268',
    boxShadow: 24,
    p: 4,
};

export function hasErrosInputs(obj : any){
   var contErros = 0;
   for (var key in obj) {
        if(obj[key].length > 0){
            contErros ++;
        }
   }
   return contErros === 0 ? false : true;
}

export function cleanStorage(){
    removeUserStorage();
    removeCaepiStorage();
}

export function stringIsDifferent(v1 : any, v2 : any){
    try{ 
        const s1 : string = v1.trim();
        const s2 : string = v2.trim();
        if(s1 != s2){
            return true;
        }
    } catch (e){
    }
    return false;
}

export function emptyUser(){
    const user : IUser = {
        firstname: '',
        lastname: '', 
        email: '',
        iconImage64: '',
        token: ''
    };
    return user;
}

export function formatCNPJ(cnpj: string): string {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function sortJSON(data : any, key : string, way : string) {
	try {
		return data.sort(function(a : any, b : any) {
	        var x = a[key]; 
	        var y = b[key];
	        
	        try {
	            x = a[key].toLowerCase().trim(); 
	            y = b[key].toLowerCase().trim();
		   	}catch(err) {
		   		x = a[key]; 
		        y = b[key];
		   	}
	        
	        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
	        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
	    });
	}catch(err) {
	}
}

export function isValidNumberCaepi(number : number){
    if(number >= CONFIG.minorNumber && number <= CONFIG.biggestNumber){
         return true;
    }else {
         return false;
    }
}
