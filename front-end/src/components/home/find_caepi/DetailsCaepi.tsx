import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { caepiMocks } from '../../../mock/caepi_mocks';
import { useLocation } from 'react-router';
import CardCaepi from './CardCaepi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getFindCaepiState } from '../../../features/findCaepiReducer';
import Validator from '../../../services/Validator';
import ICaepi from '../../../interface/ICaepi';
import { caepiEmpty } from '../../../mock/caepi_empty';
import { getCaepiStorage, setCaepiStorage } from '../../../services/CaepiStorage';
import { setHistoricCaepiState } from '../../../features/historicCaepiReducer';

export default function CardDetailsCaepi() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    var caepi : ICaepi = caepiEmpty;

    const getFindCaepi : string = useAppSelector(getFindCaepiState);
    const numberCaepi = Number(getFindCaepi);
    const isCnpj = Validator.isCNPJ(getFindCaepi);

    caepiMocks.content.map((c : ICaepi) => {
        if(c.number === numberCaepi){
            caepi = c;
            setCaepiStorage(c);
            dispatch(setHistoricCaepiState(getCaepiStorage()));
        }
    });

    if(getFindCaepi.length > 0){
        return (
            <React.Fragment>
                {caepi.number > 0 ? 
                    <CardCaepi caepi={caepi}></CardCaepi> 
                : 
                    !isCnpj ?
                    <CardContent sx={{textAlign: 'center'}}>
                        <Typography variant="h6" component="div">
                            {getFindCaepi} não encontrado.
                        </Typography>
                    </CardContent>
                    : <></>
                }
            </React.Fragment>
        );
    }else{
        return (<></>);
    }
  
}