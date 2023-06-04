import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getSearchState } from '../../../features/searchStateReducer';
import CardCaepi from './CardCaepi';
import ICaepi from '../../../interface/ICaepi';
import { findCaepiByLaboratory, findCaepiByManufacturer, findCaepiByNumber } from '../../../services/CaepiService';
import { ISearch } from '../../../interface/ISearch';
import { getCaepiStorage, setCaepiStorage } from '../../../services/CaepiStorage';
import { setHistoricCaepiState } from '../../../features/historicCaepiReducer';
import { caepiValid } from '../../../util/util';
import { caepiEmpty } from '../../../mock/caepi_empty';

export default function CardDetailsPageCaepi() {
    const dispatch = useAppDispatch();
    const [caepi, setCaepi] = React.useState<ICaepi>(caepiEmpty);
    const [pageCaepi, setPageCaepi] = React.useState<ICaepi[]>([]);
    const [page, setPage] = React.useState<Number>(0);
    const [size, setSize] = React.useState<Number>(10);
    const [erro, setErros] = React.useState('');
    
    const searchCaepi = useAppSelector(getSearchState);

    function addSearchCnpj(){
        const search : ISearch = {
            time: new Date().getTime(),
            type: searchCaepi.type,
            cnpj: searchCaepi.cnpj,
            number: 0,
            color: '#FFFFFF',
        }
        setCaepiStorage(search);
        dispatch(setHistoricCaepiState(getCaepiStorage()));
    }

    function addSearchNumber(color : string){
        const search : ISearch = {
            time: new Date().getTime(),
            type: searchCaepi.type,
            cnpj: '',
            number: searchCaepi.number,
            color: color,
        }
        setCaepiStorage(search);
        dispatch(setHistoricCaepiState(getCaepiStorage()));
    }

    React.useEffect(() => {
        setPageCaepi([]);
        setCaepi(caepiEmpty);
        setErros('');
        if(searchCaepi.cnpj.length > 0){
            if(searchCaepi.type === 'laboratory'){
                findCaepiByLaboratory(searchCaepi.cnpj, page, size).then((res : any) => {
                    if(res.status === 200){
                        setPageCaepi(res.data.content);
                        addSearchCnpj();
                    }else {
                        setErros('Sem resultados.');
                    }
                });
            }else if(searchCaepi.type === 'manufacturer'){
                findCaepiByManufacturer(searchCaepi.cnpj, page, size).then((res : any) => {
                    if(res.status === 200){
                        setPageCaepi(res.data.content);
                        addSearchCnpj();
                    }else {
                        setErros('Sem resultados.');
                    }
                });
            }
        }else if(searchCaepi.number > 0){
            findCaepiByNumber(searchCaepi.number).then((res : any) => {
                if(res.status === 200){
                    setCaepi(res.data);
                    addSearchNumber(caepiValid(res.data.status) ? '#FFFFFF' : '#910d0d');
                }else {
                    setErros('Sem resultados.');
                }
            });
        }
    }, [searchCaepi]);

    return (
        <React.Fragment>
            {pageCaepi.length > 0 ? 
                pageCaepi.map(caepi => (
                    <CardCaepi key={caepi.number} caepi={caepi}></CardCaepi>
                ))
            : 
            <></>
            }
            {caepi.number > 0 ?
                <CardCaepi caepi={caepi}></CardCaepi> 
            : 
            <></>
            }

            {pageCaepi.length > 0 || caepi.number > 0 ?
             <p className="info-status-caepi">
                <span><b>CA Expedido: </b> Data de Emissão, Renovação ou Alteração do CA.</span><br></br>
                <span><b>CA Suspenso: </b> Validade do CA suspensa para apuração. Fabricação proibida.</span><br></br>
                <span><b>CA Cancelado: </b> Certificado Cancelado. Fabricação e comercialização proibidas.</span><br></br>
                <span><b>CA Vencido: </b> Validade do CA expirada. Fabricação e comercialização proibidas.</span><br></br>
             </p>
            : 
            <></>
            }

            {erro.length > 0 ? 
              <Typography sx={{color: 'black', marginTop: '20px', textAlign: 'center'}} 
                        variant="h6" component="h6">
                {erro}
              </Typography>
            : <></>}
        </React.Fragment>
      );
  
}


