import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CardContent, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import { setUserStorage } from '../../services/UserStorage';
import { hasErrosInputs, stringIsDifferent } from '../../util/util';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserState, setUserState } from '../../features/userReducer';
import { IUser } from '../../interface/IUser';

interface IFormRegister {
  name: string,
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
    name: user !== undefined ? user.name : '',
    lastname: user !== undefined ? user.lastname : '',
    email: user !== undefined ? user.email : '',
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {name: "", lastname: "", email: "", password: "", passwordConfirmation: ""};
          errors.name = validateString(values.name);
          errors.lastname = validateString(values.lastname);
          errors.email = validateEmail(values.email);

          if(stringIsDifferent(values.name, user?.name)
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
          const userChanged : IUser = {
              name: values.name,
              lastname: values.lastname,
              email: values.email,
              image: user.image
          }
          setTimeout(() => {
            setUserStorage(userChanged);
            dispatch(setUserState(userChanged));
            setSubmitting(false);

            toast.update(idToast, {
              render: "Atualizado com sucesso!", 
              type: "success", 
              isLoading: false, 
              autoClose: 1500}
            );
          }, 2000);
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
                       onBlur={handleBlur} id="name" autoComplete='off'
                       error={touched.name && hasErros(errors.name)} 
                       helperText={touched.name && errors.name}
                       value={values.name} label="Nome" variant="outlined" />
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