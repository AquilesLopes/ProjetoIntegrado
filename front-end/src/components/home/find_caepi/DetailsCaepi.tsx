import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { caepiMocks } from '../../../mock/caepi_mocks';
import { useLocation } from 'react-router';
import ModalCaepi from './ModalCaepi';
import CardCaepi from './CardCaepi';
import { useAppSelector } from '../../../app/hooks';
import { getFindCaepiState } from '../../../features/findCaepiReducer';
import Validator from '../../../services/Validator';
import ICaepi from '../../../interface/ICaepi';
import { caepiEmpty } from '../../../mock/caepi_empty';
import { setCaepiStorage } from '../../../services/CaepiStorage';


export default function CardDetailsCaepi() {
    const location = useLocation();
    const [caepi, setCaepi] = React.useState<ICaepi>(caepiEmpty);

    const getFindCaepi : string = useAppSelector(getFindCaepiState);
    const showModalCaepi = location.pathname === '/' ? true : false;
    const numberCaepi = Number(getFindCaepi);
    const isCnpj = Validator.isCNPJ(getFindCaepi);

    caepiMocks.content.map((c : any) => {
        if(caepi.number !== numberCaepi && c.number === numberCaepi){
            setCaepi(c);

            if(!showModalCaepi){
                setCaepiStorage(c);
            }
        }
    });

    if(getFindCaepi.length > 0){
        return (
            <React.Fragment>
                {caepi.number > 0 ? 
                    showModalCaepi ? <ModalCaepi caepi={caepi}></ModalCaepi> 
                    : <CardCaepi caepi={caepi}></CardCaepi>
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