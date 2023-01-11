import * as React from 'react';
import { Box, Button, CardContent, Modal, TextField } from '@mui/material';
import { styleModal } from '../../util/util';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserState, setUserState } from '../../features/userReducer';
import { IUser } from '../../interface/IUser';
import { setUserStorage } from '../../services/UserStorage';
import { toast } from 'react-toastify';
import { squareAndResizeImage } from '../../services/ImageService';

export default function ModalChangerImageUser(arg : any) {
  const [imageValid, setImageValid] = React.useState(true);
  const modalRef = React.useRef(null);

  var user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  function handleChange(e : any){
    console.log('validando...');
    try{
      if (!e.target.files[0]) {
        console.log('no file');
        setImageValid(false);
        return;
      } 

      var typeFile : string = e.target.files[0].type.toLowerCase();
      if (!typeFile.includes("image")) {
        console.log('Invalid format');
        setImageValid(false);
        return;
      }

      arg.setOpen(false);
      setImageValid(true);
      const idToast = toast.loading("Enviando...");
      var file = e.target.files[0];
      var reader = new FileReader();
      var baseString;
      
      reader.onloadend = function () {
          baseString = reader.result;
          handleImageUser(baseString + "", idToast);
      };
      reader.readAsDataURL(file);
    }catch(e){
      setImageValid(false);
    }
  }

  function handleImageUser(imageBase64: string, idToast : any){

      squareAndResizeImage(imageBase64, 200, 200)
      .then((imgResize) : any => {

          const newUser : IUser = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            image: imgResize + ""
          } 
          
          setUserStorage(newUser);
          dispatch(setUserState(newUser));
      
          toast.update(idToast, {
            render: "Atualizado com sucesso!", 
            type: "success", 
            isLoading: false, 
            autoClose: 1500}
          );

      });

  }


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
                <CardContent className="card-content-form">
                  <TextField fullWidth type="file" onChange={(e) => handleChange(e)} 
                            autoComplete='off'
                            error={!imageValid} 
                            helperText={imageValid ? "" : "Arquivo Inválido, selecione uma imagem PNG, JPG ou JPEG"}
                            value="" label="" variant="outlined" />
                </CardContent>

                <Box className="box-btn-form" >
                    <Button sx={{margin: '10px'}} onClick={() => arg.setOpen(false)} variant="contained" color="error">
                      <CancelIcon sx={{marginRight: '5px'}} /> Cancelar 
                    </Button>
                </Box>
            </Box>
        </Modal>
    </React.Fragment>
  );
}

