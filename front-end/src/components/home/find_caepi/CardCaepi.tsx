import * as React from 'react';
import { Box, Card, CardContent, Divider, Modal, Typography } from '@mui/material';
import { caepiValid, formatDate, formatDateTime, isMobile, styleModal } from '../../../util/util';
import MenuInCaepi from '../../find_caepi/MenuInCaepi';


export default function CardCaepi({caepi} : any) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const modalRef = React.useRef(null);
  const colorCA = caepiValid(caepi.status) ? 'green' : 'red';

  function showModal(value : string){
    setText(value);
    setOpen(true);
  }

  function formatTextStatusCaepi(){
    if(caepiValid(caepi.status)){
       return `VÁLIDO até ${formatDate(caepi.validity)}`;
    }else if(caepi.status == 'VENCIDO'){
      return `${caepi.status} em ${formatDate(caepi.validity)}`;
    }else {
      return `${caepi.status} ${formatDate(caepi.validity)}`;
    }
  }
 
  return (
    <React.Fragment>
      <Card className="card">
          <CardContent className="card-content"> 
              <MenuInCaepi caepi={caepi} showModal={showModal} />
              <Typography><b>{caepi.equipment.name}</b></Typography>
              <br></br>
              <Typography className="number-caepi" component="p"><small>Registro nº {caepi.number}</small></Typography>
              <br></br>
              <Typography sx={{color: colorCA}} component="p"><small>Status: {formatTextStatusCaepi()}</small></Typography>
              <Typography component="p"><small>Marcação do CA: {caepi.equipment.brand}</small></Typography>
              <Typography component="p"><small>Cor: {caepi.equipment.color}</small></Typography>
              <Typography component="p"><small>Produto: {caepi.equipment.origin}</small></Typography>
              <Typography component="p"><small>Norma Técnica: {caepi.report.standard}</small></Typography>
              <Typography component="p"><small>Relatório Técnico nº {caepi.report.reportNumber}</small></Typography>
              <Typography component="p"><small>Processo: {caepi.report.process}</small></Typography>
              <Typography component="p"><small>Restrição: {caepi.report.restriction}</small></Typography>
              <Typography component="p"><small>Referência: {caepi.report.reference}</small></Typography>
              <Typography component="p"><small>Aprovado para: {caepi.report.approvedFor}</small></Typography>

              <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
              <Typography component="p">
                  <small>
                    Fonte: Base de dados do Departamento de Segurança e Saúde no Trabalho, 
                    publicada em {formatDateTime(caepi.update)}.
                  </small>
              </Typography>
          </CardContent>
      </Card>
      <Modal
            ref={modalRef}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        > 
            <Box sx={{...styleModal, width: isMobile ? '98%' : '70%', p: 0}}>
                <CardContent className="modal-card-content">
                   {text}
                </CardContent>
            </Box>
        </Modal>
    </React.Fragment>
  );
}