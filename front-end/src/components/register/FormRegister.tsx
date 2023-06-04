import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CardContent, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { setUserStorage } from '../../services/UserStorage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { hasErrosInputs } from '../../util/util';
import { toast } from 'react-toastify';
import { setUserState } from '../../features/userReducer';
import { useAppDispatch } from '../../app/hooks';
import { IUser } from '../../interface/IUser';
import { createUser } from '../../services/UserService';
import { error } from 'console';
import { AxiosResponse } from 'axios';

interface IFormRegister {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

const initialValues : IFormRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirmation: ""
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

function validateLastName(string: string): string {
  var error : string = validateString(string);

  if(error.length === 0){
    const trimmedString = string.trim();
    const words = trimmedString.split(' ');
    if(words.length < 2){
      error = 'Informe o sobrenome completo!';
    }
  }

  return error;
}

function validatePassword(value : string){
  if (!value) {
    return 'Informe uma senha';
  } else if (value.length < 5) {
    return 'Senha fraca';
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

export default function FormRegister() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);
  const history = useHistory();

  function handleChangeShowPassword(){
    setShowPassword(showPassword ? false : true);
  }

  function handleChangeShowPasswordConfirmation(){
    setShowPasswordConfirmation(showPasswordConfirmation ? false : true);
  }

  function exitSystem(){
    history.push("/");
  }
 
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {firstname: "", lastname: "", email: "", password: "", passwordConfirmation: ""};
          errors.firstname = validateString(values.firstname);
          errors.lastname = validateLastName(values.lastname);
          errors.email = validateEmail(values.email);
          errors.password = validatePassword(values.password);

          if(errors.password.length === 0 && values.passwordConfirmation !== values.password){
             errors.passwordConfirmation = "A confirmação de senha deve ser igual a senha";
          }else{
            errors.passwordConfirmation = "";
          }

          return hasErrosInputs(errors) ? errors : {};
        }}

        onSubmit={(values, { setSubmitting }) => {
          const idToast = toast.loading("Enviando...");
          setTimeout(() => {

            const newUser : IUser = {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              password: values.password
            }

            createUser(newUser).then((resp : AxiosResponse) => {
              if(resp.request.status === 200){
                  history.push("/login");

                  toast.update(idToast, {
                    render: "Cadastrado com sucesso!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 1500}
                  );
              }else if(resp.request.status === 400){
                toast.update(idToast, {
                  render: "E-mail já cadastrado!", 
                  type: "error", 
                  isLoading: false, 
                  autoClose: 1500}
                );
              }else if(resp.request.status === 422){
                toast.update(idToast, {
                  render: "Verifique os seus dados e tenta novamente!", 
                  type: "error", 
                  isLoading: false, 
                  autoClose: 1500}
                );
              }else {
                toast.update(idToast, {
                  render: "Error ao tentar registrar, por favor, tente mais tarde!", 
                  type: "error", 
                  isLoading: false, 
                  autoClose: 1500}
                );
              }
            }).catch(error => {
              toast.update(idToast, {
                render: "Error ao tentar registrar, por favor, tente mais tarde!", 
                type: "error", 
                isLoading: false, 
                autoClose: 1500}
              );
            });

            setSubmitting(false);
          }, 1000);
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
            <FormControl fullWidth variant="outlined">
              <InputLabel error={touched.password && hasErros(errors.password)}  
                          htmlFor="password">Senha</InputLabel>
              <OutlinedInput
                  id="password"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  label="Senha"
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.password && hasErros(errors.password)} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleChangeShowPassword}
                        onMouseDown={handleChangeShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
              />
              <FormHelperText error id="password-error">
                {errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel error={touched.passwordConfirmation && hasErros(errors.passwordConfirmation)}  
                          htmlFor="passwordConfirmation">Confirmação de Senha</InputLabel>
              <OutlinedInput
                  id="passwordConfirmation"
                  fullWidth
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  value={values.passwordConfirmation}
                  label="Confirmação de Senha"
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.passwordConfirmation && hasErros(errors.passwordConfirmation)} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleChangeShowPasswordConfirmation}
                        onMouseDown={handleChangeShowPasswordConfirmation}
                        edge="end"
                      >
                        {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
              />
              <FormHelperText error id="passwordConfirmation-error">
                {touched.passwordConfirmation ? errors.passwordConfirmation : ""}
              </FormHelperText>
            </FormControl>
          </CardContent>

          <Box className="box-btn-form" >
              <Button sx={{margin: '10px'}} onClick={exitSystem} variant="outlined" color="error">
                <CancelIcon sx={{marginRight: '5px'}} /> Cancelar 
              </Button>
              <Button sx={{margin: '10px'}} disabled={isSubmitting} type="submit" 
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