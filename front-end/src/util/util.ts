import { removeCaepiStorage } from "../services/CaepiStorage";
import { removeUserStorage } from "../services/UserStorage";

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
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '98%' : '40%',
    bgcolor: 'background.paper',
    color: '#000',
    border: '2px solid #000',
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
