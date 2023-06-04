import * as React from 'react';
import { Box, Divider, Modal, Typography } from '@mui/material';
import { styleModal } from '../../util/util';
import FormChangeDataUser from './FormChangeDataUser';
import FormChangePasswordUser from './FormChangePasswordUser';


export default function ModalChangerPassword(arg : any) {
  const modalRef = React.useRef(null);

  return (
    <React.Fragment>
        <Modal
            ref={modalRef}
            open={arg.open}
            onClose={() => arg.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
              <FormChangePasswordUser setOpen={arg.setOpen} />
            </Box>
        </Modal> 
    </React.Fragment>
  );
}

