import { Box, CircularProgress, Divider, IconButton, InputBase, Modal, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Validator from "../../../services/Validator";
import SearchIcon from '@mui/icons-material/Search';

import { toast } from "react-toastify";
import { caepiValid, formatDate, formatDateTime, isValidNumberCaepi, styleModal } from "../../../util/util";
import { caepiEmpty } from "../../../mock/caepi_empty";
import ICaepi from "../../../interface/ICaepi";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import React from "react";
import { simpleFindCaepiByNumber } from "../../../services/CaepiService";

type Response = {
    status: number;
    data: ICaepi;
}

export default function FindCaepiHome() {
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [caepi, setCaepi] = useState<ICaepi>(caepiEmpty);
    const [error, setError] = useState("");
    const [boxShadow, setBoxShadow] = useState("paper-search");

    const validate = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var valueStr = ev.currentTarget.value;
        setNumber(0);

        if(valueStr.length > 0){
            try{
                valueStr = Validator.getNumbers(valueStr);
                let numberCaepi = parseInt(valueStr, 10);
                setNumber(numberCaepi);
                
                if (isValidNumberCaepi(numberCaepi)){
                    setError('');
                }else {
                    setError(`* Número de registro inválido!`);
                }
            } catch(e){
                setError('');
            }
        }else{
            setError('');
        }
    };

    function findCaepiByNumber(){
        if (isValidNumberCaepi(number)){
            setError('');
            toast("Pesquisando...", { autoClose: 800 });
            setLoading(true);
            setTimeout(function(){ 
                simpleFindCaepiByNumber(number).then((resp : Response) => {
                    try {
                        if(resp.status === 200){
                            setCaepi(resp.data);
                            setOpen(true);
                        }else {
                            setError(`* Registro ${number} não encontrado!`);
                        }
                    } catch (error) {
                        setError(`* Registro ${number} não encontrado!`);
                    }
                    setLoading(false);
                }).catch(error => {
                    setError(`* Registro ${number} não encontrado!`);
                    setLoading(false);
                })
            }, 1000);
        } else {
            setError(`* Informe um número de registro válido!`);
        }
    }

    function cleanFormSearchCaepi(){
        setError('');
        setNumber(0);
    }

    function handleBoxShadow(focus : boolean){
        if(error.length > 0){
            setBoxShadow("paper-search paper-search-error");
        }else if(focus){
            setBoxShadow("paper-search paper-search-success");
        }else {
            setBoxShadow("paper-search");
        }
    }

    return (
        <>
            <form onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                <Paper component="div" className={boxShadow}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    >
                    <InputBase type="tel" onChange={(event) => validate(event)}
                        sx={{ ml: 1, flex: 1}} onFocus={() => handleBoxShadow(true)}
                        autoCorrect="off" autoComplete="off" onBlur={() => handleBoxShadow(false)}
                        placeholder="Número de registro" value={number > 0 ? number : ''}
                        inputProps={{ 'aria-label': 'search CAEPI by register number' }}
                    />
                    {number > 0 && !loading ?
                    <IconButton onClick={cleanFormSearchCaepi} 
                                type="button" sx={{ p: '6px' }} aria-label="search">
                        <DeleteSweepIcon />
                    </IconButton>
                    : <></>}
                    <IconButton onClick={findCaepiByNumber} disabled={loading}
                        className={error.length > 0 ? "btn-search btn-search-error" : "btn-search"}
                        type="submit" aria-label="search">
                        {loading ? <CircularProgress size={22} color="success" />
                        : <><SearchIcon /> <span>Verificar</span></>
                        }
                    </IconButton>
                </Paper>
            </form>
            {error.length > 0 ? <p className="msg-error">{error}</p> : ''}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                <Typography sx={{textAlign: 'center'}}><b>{caepi.equipment.name}</b></Typography>
                <Typography component="p"><small>Registro nº {caepi.number}</small></Typography>
                <Typography component="p">
                    <small>Status: {caepi.status}
                    {caepiValid(caepi.status)  ? ' até ' + formatDate(caepi.validity) : ''}</small> 
                </Typography>
                <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
                <Typography component="p">
                    <small>
                        Fonte: Base de dados do Departamento de Segurança e Saúde no Trabalho, 
                        publicada em {formatDateTime(caepi.update)}.
                    </small>
                </Typography>
                <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
                <Typography component="p">
                    <small>Acesse a área do usuário para visualizar o detalhamento completo.</small> 
                </Typography>  
                </Box>
            </Modal>
        </>
    );
};
  
