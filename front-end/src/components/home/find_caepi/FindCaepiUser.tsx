import { Avatar, Button, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LoadingButton from '@mui/lab/LoadingButton';
import StyledMenuFindCaepi from "./StyledMenuFindCaepi";
import { IOptionFind } from "../../../interface/IOptionFind";
import Validator from "../../../services/Validator";

import CardDetailsCaepi from "./DetailsCaepi";
import CardDetailsPageCaepi from "./DetailsPageCaepi";
import { toast } from "react-toastify";
import { getLocalCaepiState, setFindCaepiState, setLocalCaepiState } from "../../../features/findCaepiReducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useLocation } from "react-router";

const CAEPI_ID_TEST = "47504, 47460, 47447 ou 47174";
const options = [
    {id: 1, name: "Número de Registro", 
    code: "R", label: "Número de Registro", 
    description: "Esta página é uma prototipação, logo, não possui comunicação com back-end, para testar use os números " + CAEPI_ID_TEST},
    {id: 2, name: 'Fabricante', code: "F", label: "CNPJ do Fabricante", 
    description: "Esta página é uma prototipação, logo, não possui comunicação com back-end, para testar use o CNPJ 07.145.732./0001-19"},
    {id: 3, name: 'Laboratório', code: "L", label: "CNPJ do Laboratório", 
    description: "Esta página é uma prototipação, logo, não possui comunicação com back-end, para testar use o CNPJ 87.190.161/0001-73"},
];

export default function FindCaepiUser() {
    const location = useLocation();
    const [number, setNumber] = useState(0);
    const [cnpj, setCNPJ] = useState("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [option, setOption] = useState<IOptionFind>(options[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState("");

    const getLocalCaepi = useAppSelector(getLocalCaepiState);
    const dispatch = useAppDispatch();

    if(location.pathname !== getLocalCaepi){
        dispatch(setFindCaepiState(""));
        dispatch(setLocalCaepiState(location.pathname));
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
                
                if (value > 1000){
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
        dispatch(setFindCaepiState(""));
        if(option.id === 1 && isValid && number > 1000){
            toast("Pesquisando...", { autoClose: 1500 });
            setLoading(true);
            setTimeout(function(){ 
                dispatch(setFindCaepiState(number + ""));
                setLoading(false);
             }, 2000);
        }else if(option.id === 2 && isValid || option.id === 3 && isValid){
            toast("Pesquisando...", { autoClose: 1500 });
            setLoading(true);
            setTimeout(function(){ 
                dispatch(setFindCaepiState(cnpj));
                setLoading(false);
             }, 2000);
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
                    {option.code}
                </Avatar>
                }
                action={<StyledMenuFindCaepi options={options} option={option} setOption={setOption} />}
                title={`Pesquisa por ${option.name}`}
                subheader={option.description}
            />
            <CardContent>
                <Grid container spacing={{ xs: 1, md: 2 }}>
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
                                    onClick={findCaepiByNumber} variant="contained">
                                    <FindInPageIcon /> 
                            </Button>
                        }
                    </Grid> 
                    <Grid item xs={12}>
                        <CardDetailsCaepi />
                        <CardDetailsPageCaepi />
                    </Grid>
                </Grid>
            </CardContent>
        </>
    );
};
  
