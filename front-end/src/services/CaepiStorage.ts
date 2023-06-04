import { ISearch } from "../interface/ISearch";
import { sortJSON } from "../util/util";

export function setCaepiStorage(search : ISearch){
    var jsonArray = getCaepiStorage();
    var listSearch : ISearch[] = getCaepiStorage();

    for(var i = 0; i < jsonArray.length; i++){
        listSearch = removeCaepiArray(listSearch, search);
    }
    
    if(listSearch.length >= 5){
        listSearch.shift();
    }

    listSearch.push(search);
    sortJSON(listSearch, 'time', '321');
    localStorage.setItem('search', JSON.stringify(listSearch));
}

export function getCaepiStorage() : ISearch[]{
    var jsonString = localStorage.getItem('search');
    jsonString = jsonString === null ? '[]' : jsonString;
    var obj = JSON.parse(jsonString);
    return Array.isArray(obj) ? obj : [];
}

export function removeCaepiStorage(){
    localStorage.removeItem('search');
}

function removeCaepiArray(array : ISearch[], search : ISearch){
    var index = -1;
    for(var i = 0; i < array.length; i++){
        if(search.type === 'number' && array[i].number === search.number){
            index = i;
        }else if(search.type === 'laboratory' && array[i].cnpj === search.cnpj){
            index = i;
        }else if(search.type === 'manufacturer' && array[i].cnpj === search.cnpj){
            index = i;
        }
    }
    if(index > -1){
        array.splice(index, 1);
    }
    return array;
}