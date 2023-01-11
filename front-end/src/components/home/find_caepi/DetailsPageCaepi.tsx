import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { caepiMocks } from '../../../mock/caepi_mocks';
import { useAppSelector } from '../../../app/hooks';
import { getFindCaepiState } from '../../../features/findCaepiReducer';
import CardCaepi from './CardCaepi';
import { useLocation } from 'react-router';
import ICaepi from '../../../interface/ICaepi';
import Validator from '../../../services/Validator';

export default function CardDetailsPageCaepi() {
    const location = useLocation();
    const getFindCaepi = useAppSelector(getFindCaepiState);
    var pageCaepi : ICaepi[] = [];
    const isCnpj = Validator.isCNPJ(getFindCaepi);

    if(pageCaepi.length == 0){
        caepiMocks.content.map((c : any) => {
            if(c.equipment.manufacturer.cnpj === getFindCaepi || c.report.laboratory.cnpj === getFindCaepi){
                if(pageCaepi.length < 2){
                    pageCaepi.push(c);
                }
            }
        });
    }

    if(getFindCaepi.length > 0){
        return (
            <React.Fragment>
                {pageCaepi.length > 0 ? 
                    pageCaepi.map(caepi => (
                        <CardCaepi key={caepi.number} caepi={caepi}></CardCaepi>
                    ))
                : 
                    isCnpj ?
                    <CardContent sx={{textAlign: 'center'}}>
                        <Typography variant="h6" component="div">
                            {getFindCaepi} não encontrado.
                        </Typography>
                    </CardContent>
                    : <></>
                }
            </React.Fragment>
          );
    }else {
        return (<></>);
    }
  
}


