import * as React from 'react';
import { Box, Divider, Modal, Typography } from '@mui/material';
import { caepiValid, formatDate, styleModal } from '../../../util/util';
import ICaepi from '../../../interface/ICaepi';


export default function ModalCaepi({caepi} : any) {
  const [open, setOpen] = React.useState(true);
  const modalRef = React.useRef(null);
  const isArray = Array.isArray(caepi);

  return (
    <React.Fragment>
        <Modal
            ref={modalRef}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
              {isArray ? DetailsPageCaepi(caepi)
              : DetailsCaepi(caepi)
              }
              <Typography component="p">
                  <small>
                    Fonte: Base de dados do Departamento de Segurança e Saúde no Trabalho.
                  </small>
              </Typography>
              <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
              <Typography component="p">
                  <small>Logue no sistema para visualizar o detalhamento completo.</small> 
              </Typography>  
            </Box>
        </Modal>
    </React.Fragment>
  );
}

function DetailsCaepi(caepi : ICaepi){
  return (
    <React.Fragment>
      <Typography sx={{textAlign: 'center'}}><b>{caepi.equipment.name}</b></Typography>
      <Typography component="p"><small>Registro nº {caepi.number}</small></Typography>
      <Typography component="p">
        <small>Status: {caepi.status}
        {caepiValid(caepi.status)  ? ' até ' + formatDate(caepi.validity) : ''}</small> 
      </Typography>
      <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
    </React.Fragment>
  );
}

function DetailsPageCaepi(pageCaepi : ICaepi[]){
  return (
      <React.Fragment>
          {pageCaepi.map(caepi => (
            <>
              <Typography component="p"><small>{caepi.equipment.name}</small></Typography>
              <Typography component="p">
                <small>Registro nº {caepi.number}</small>
              </Typography>
              <Typography component="p">
                <small>Status: {caepi.status}
                {caepiValid(caepi.status)  ? ' até ' + formatDate(caepi.validity) : ''}</small>
              </Typography>
              <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
            </>
          ))}
      </React.Fragment>
    );
}