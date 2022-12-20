import ICaepi from "../interface/ICaepi";

export function setCaepiStorage(caepi : ICaepi){
    var json = getCaepiStorage();
    var json = removeCaepiArray(json, caepi);
    
    if(json.length >= 5){
        json.shift();
    }

    json.push(caepi);
    json.reverse();
    localStorage.setItem('caepi', JSON.stringify(json));
}

export function getCaepiStorage() : ICaepi[]{
    var jsonString = localStorage.getItem('caepi');
    jsonString = jsonString === null ? '[]' : jsonString;
    var obj = JSON.parse(jsonString);
    return Array.isArray(obj) ? obj : [];
}

export function removeCaepiStorage(){
    localStorage.removeItem('caepi');
}

function removeCaepiArray(array : ICaepi[], caepi : ICaepi){
    var index = -1;
    for(var i = 0; i < array.length; i++){
        if(array[i].number === caepi.number){
            index = i;
        }
    }
    if(index > -1){
        array.splice(index, 1);
    }
    return array;
}