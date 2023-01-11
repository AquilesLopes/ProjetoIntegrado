import { Box, CircularProgress, Divider, IconButton, InputBase, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Validator from "../../../services/Validator";
import SearchIcon from '@mui/icons-material/Search';

import { toast } from "react-toastify";
import { caepiValid, formatDate, formatDateTime, styleModal } from "../../../util/util";
import { caepiEmpty } from "../../../mock/caepi_empty";
import ICaepi from "../../../interface/ICaepi";
import { caepiMocks } from "../../../mock/caepi_mocks";

export default function FindCaepiHome() {
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [caepi, setCaepi] = useState<ICaepi>(caepiEmpty);
    const [error, setError] = useState("");

    const validate = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var valueStr = ev.currentTarget.value;
        setNumber(0);

        if(valueStr.length > 0){
            try{
                valueStr = Validator.getNumbers(valueStr);
                let value = parseInt(valueStr, 10);
                setNumber(value);
                
                if (value > 1000){
                    setError('');
                }else {
                    setError(`* Número de registro inválido!`);
                }
            } catch(e){
                setError(`* Número de registro inválido!`);
            }
        }else{
            setError('');
        }
    };

    function findCaepiByNumber(){
        if (number > 1000){
            toast("Pesquisando...", { autoClose: 800 });
            setLoading(true);
            setTimeout(function(){ 
                var status = 404;
                caepiMocks.content.map((c : ICaepi) => {
                    if(c.number === number){
                        setCaepi(c);
                        status = 200;
                    }
                });
                if(status === 200){
                    setOpen(true);
                }else if(status === 404){
                    setError(`* Registro ${number} não encontrado!`);
                }else{
                    setError(`* Número de registro inválido!`);
                }
                setLoading(false);
            }, 1000);
        }
    }

    return (
        <>
            <form onSubmit={findCaepiByNumber}>
                <Paper className="paper-search" component="div"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        type="tel" onChange={(event) => validate(event)}
                        placeholder="Número de registro" error={true} value={number > 0 ? number : ''}
                        inputProps={{ 'aria-label': 'search CAEPI by register number' }}
                    />
                    <IconButton onClick={findCaepiByNumber} disabled={loading}
                        className="btn-search" type="submit" aria-label="search">
                        {loading ? <CircularProgress size={22} color="success" />
                        : <><SearchIcon /> <span>Verificar</span></>
                        }
                    </IconButton>
                </Paper>
            </form>
            {error.length > 0 ? <p className="msg-error">{error}</p> : ''}
            <p className="msg-info">* Teste com 47504 ou 47460, esta msg será removida na versão de produção.</p>
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
                    <small>Logue no sistema para visualizar o detalhamento completo.</small> 
                </Typography>  
                </Box>
            </Modal>
        </>
    );
};
  
