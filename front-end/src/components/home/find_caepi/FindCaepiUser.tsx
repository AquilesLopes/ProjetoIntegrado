import { Avatar, Button, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LoadingButton from '@mui/lab/LoadingButton';
import StyledMenuFindCaepi from "./StyledMenuFindCaepi";
import { IOptionFind } from "../../../interface/IOptionFind";
import Validator from "../../../services/Validator";

import CardDetailsPageCaepi from "./DetailsPageCaepi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSearchState, setSearchState } from "../../../features/searchStateReducer";
import { ISearch } from "../../../interface/ISearch";

import BiotechIcon from '@mui/icons-material/Biotech';
import BusinessIcon from '@mui/icons-material/Business';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { isValidNumberCaepi } from "../../../util/util";

const options = [
    {id: 1, name: "Número de Registro", code: "number", label: "Número de registro", description: ""},
    {id: 2, name: 'Fabricante', code: "manufacturer", label: "CNPJ do fabricante", description: ""},
    {id: 3, name: 'Laboratório', code: "laboratory", label: "CNPJ do laboratório", description: ""},
];

export default function FindCaepiUser() {
    const [number, setNumber] = useState<number>(0);
    const [cnpj, setCNPJ] = useState("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [option, setOption] = useState<IOptionFind>(options[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState("");

    const dispatch = useAppDispatch();
    const searchCaepi = useAppSelector(getSearchState);

    if(searchCaepi.type !== option.code){
       for(var i = 0; i < options.length; i++){
           if(options[i].code === searchCaepi.type){
              setOption(options[i]);
           }
       }
    }

    const validate = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var valueStr = ev.currentTarget.value;
        setValueInput(valueStr);
        setIsValid(false);
        setNumber(0);
        setCNPJ("");

        try{
            valueStr = Validator.getNumbers(valueStr);
            if(option.id === 1){
                let value = parseInt(valueStr, 10);
                setNumber(value);
                
                if (isValidNumberCaepi(value)){
                    setIsValid(true);
                }else {
                    setIsValid(false);
                }
            }else if(option.id === 2 || option.id === 3){
                if(Validator.isCNPJ(valueStr)){
                    setIsValid(true);
                    setCNPJ(valueStr);
                }
            }
        } catch(e){
        }
    };

    function findCaepiByNumber(){
        if(option.id === 1 && isValid && isValidNumberCaepi(number)){
            toast("Pesquisando...", { autoClose: 1500 });  
            setLoading(true);
            
            const search : ISearch = {
                type: option.code, cnpj: '',
                number: number,
                color: '', time: 0
            }
            dispatch(setSearchState(search));

            setTimeout(function(){ 
                
                setLoading(false);
             }, 1000);
        }else if(option.id === 2 && isValid || option.id === 3 && isValid){
            toast("Pesquisando...", { autoClose: 500 });
            setLoading(true);

            const search : ISearch = {
                type: option.code, 
                cnpj: cnpj,
                number: number,
                color: '', time: 0
            }
            dispatch(setSearchState(search));

            setTimeout(function(){ 
                setLoading(false);
             }, 1000);
        }
    }

    useEffect(() => {
        setValueInput("");
    },[option]);

    const showError = !isValid && valueInput.length > 0;

    return (
        <>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
                        {option.code === 'number' ? <InsertDriveFileIcon /> : <></>}
                        {option.code === 'manufacturer' ? <BusinessIcon /> : <></>}
                        {option.code === 'laboratory' ? <BiotechIcon /> : <></>}
                    </Avatar>
                }
                action={<StyledMenuFindCaepi options={options} />}
                title={
                    <Typography sx={{color: 'black', marginTop: '3px'}} variant="h6" component="h6">
                        Por {option.name.toLowerCase()}
                    </Typography>
                }
                subheader={option.description}
            />
            <CardContent>
                <Grid container spacing={{ xs: 1, md: 2 }}>
                    <form className="form-find-caepi-user" onSubmit={e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                    <Grid item xs={10}>
                        <TextField type="tel" fullWidth onChange={(event) => validate(event)}
                                value={valueInput}
                                error={showError} label={option.label} 
                                variant="outlined"
                                helperText={showError ? "O número é inválido!" : ""} />
                    </Grid>   
                    <Grid item xs={2}>
                        {loading ? 
                            <LoadingButton fullWidth sx={{height: '53px'}} loading variant="outlined">
                                Loading...
                            </LoadingButton>
                            :
                            <Button fullWidth disabled={!isValid} sx={{height: '53px'}}
                                    onClick={findCaepiByNumber} variant="contained" type="submit">
                                    <FindInPageIcon /> 
                            </Button>
                        }
                    </Grid> 
                    </form>
                    <Grid item xs={12}>
                        <CardDetailsPageCaepi />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    );
};
  
