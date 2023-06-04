import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CardContent, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import { getUserStorage, setUserStorage } from '../../services/UserStorage';
import { hasErrosInputs, stringIsDifferent } from '../../util/util';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserState, setUserState } from '../../features/userReducer';
import { IUser } from '../../interface/IUser';
import { updateUserLogged } from '../../services/UserService';

interface IFormRegister {
  firstname: string,
  lastname: string,
  email: string,
}

function validateEmail(email : string){
  if (!email) {
    return 'Informe um e-mail';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return 'Invalid email address';
  } else {
    return '';
  }
}

function validateString(value : string){
  if (!value) {
    return 'Informe um nome';
  } else if (value.length < 5) {
    return 'Informe um nome válido';
  } else {
    return '';
  }
}

function hasErros(value : string | undefined){
  if (value === null || value === undefined || value === '') {
      return false;
  }else {
    return true;
  }
}

export default function FormChangeDataUser(arg : any) {
  const [formChanged, setFormChanged] = React.useState(false);
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  const initialValues : IFormRegister = {
    firstname: user !== undefined ? user.firstname : '',
    lastname: user !== undefined ? user.lastname : '',
    email: user !== undefined ? user.email : '',
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {firstname: "", lastname: "", email: "", password: "", passwordConfirmation: ""};
          errors.firstname = validateString(values.firstname);
          errors.lastname = validateString(values.lastname);
          errors.email = validateEmail(values.email);

          if(stringIsDifferent(values.firstname, user?.firstname)
            || stringIsDifferent(values.lastname, user?.lastname)
            || stringIsDifferent(values.email, user?.email)){
            setFormChanged(true);
          }else{
            setFormChanged(false);
          }

          if(hasErrosInputs(errors)){
            setFormChanged(false);
          }

          return hasErrosInputs(errors) ? errors : {};
        }}

        onSubmit={(values, { setSubmitting }) => {
          arg.setOpen(false);
          const idToast = toast.loading("Enviando...");

          updateUserLogged(values.firstname, values.lastname, values.email)
          .then((res : any) => {
              setSubmitting(false);
              if(res.status === 200){
                  arg.setOpen(false);
                  const userStorage = getUserStorage();
                  const userChanged : IUser = {
                      firstname: values.firstname,
                      lastname: values.lastname,
                      email: values.email,
                      iconImage64: userStorage.iconImage64,
                      token: userStorage.token
                  }
                  setUserStorage(userChanged);
                  dispatch(setUserState(userChanged));
                  toast.update(idToast, {
                    render: "Atualizado com sucesso!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 1500}
                  );
              }else {
                  toast.update(idToast, {
                    render: "Erro ao tentar atualizar dados!", 
                    type: "error", 
                    isLoading: false, 
                    autoClose: 1500}
                  );
              }
          });
        }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <CardContent className="card-content-form">
            <TextField fullWidth type="text" onChange={handleChange} 
                       onBlur={handleBlur} id="firstname" autoComplete='off'
                       error={touched.firstname && hasErros(errors.firstname)} 
                       helperText={touched.firstname && errors.firstname}
                       value={values.firstname} label="Primeiro nome" variant="outlined" />
            <TextField fullWidth type="text" onChange={handleChange} 
                       onBlur={handleBlur} id="lastname" autoComplete='off'
                       error={touched.lastname && hasErros(errors.lastname)} 
                       helperText={touched.lastname && errors.lastname}
                       value={values.lastname} label="Sobrenome" variant="outlined" />
            <TextField fullWidth type="text" onChange={handleChange} 
                       onBlur={handleBlur} id="email" autoComplete='off' 
                       error={touched.email && hasErros(errors.email)} 
                       helperText={touched.email && errors.email} 
                       value={values.email} label="E-mail" variant="outlined" />
          </CardContent>

          <Box className="box-btn-form" >
              <Button sx={{margin: '10px'}} onClick={() => arg.setOpen(false)} variant="contained" color="error">
                <CancelIcon sx={{marginRight: '5px'}} /> Cancelar 
              </Button>
              <Button sx={{margin: '10px'}} disabled={!formChanged} type="submit" 
                      variant="contained" color="success">
                <SendIcon sx={{marginRight: '5px'}} /> Enviar 
              </Button>
          </Box>
        </form>
       )}
     </Formik>
    </React.Fragment>
  );
}