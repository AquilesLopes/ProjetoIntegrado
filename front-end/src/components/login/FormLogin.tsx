import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CardContent, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { getUserStorage, setUserStorage } from '../../services/UserStorage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { cleanStorage, emptyUser, hasErrosInputs } from '../../util/util';
import { toast } from 'react-toastify';
import { CONFIG } from '../../util/config';
import axios from 'axios';
import { getUserLogged, loginService } from '../../services/UserService';
import { setUserState } from '../../features/userReducer';
import { useAppDispatch } from '../../app/hooks';
import { setHistoricCaepiState } from '../../features/historicCaepiReducer';

interface IFormLogin {
  email: string,
  password: string
}

const initialValues : IFormLogin = {
  email: "",
  password: ""
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

function validatePassword(value : string){
  if (!value) {
    return 'Informe uma senha';
  } else if (value.length < 5) {
    return 'Senha inválida';
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

export default function FormLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  function handleChangeShowPassword(){
    setShowPassword(showPassword ? false : true);
  }

  function exitSystem(){
    history.push("/");
  } 

  function cleanLocalStorage(){
    cleanStorage();
    dispatch(setUserState(emptyUser()));
    dispatch(setHistoricCaepiState([]));
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {email: "", password: ""};
          errors.email = validateEmail(values.email);
          errors.password = validatePassword(values.password);

          return hasErrosInputs(errors) ? errors : {};
        }}

        onSubmit={(values, actions) => {
          const idToast = toast.loading("Logando...");

          cleanLocalStorage();

          const email = values.email.toLowerCase().trim();

          loginService(email, values.password).then((status) => {
              actions.setSubmitting(false);
              if(status === 200){
                  getUserLogged().then((res : any) => {
                      if(res.status === 200){
                        const userStorage = getUserStorage();
                        const userLoged = {
                            firstname: res.data.firstname,
                            lastname: res.data.lastname,
                            email: res.data.email,
                            iconImage64: res.data.iconImage64,
                            token: userStorage.token
                        }
                        setUserStorage(userLoged);
                        dispatch(setUserState(userLoged));

                        toast.update(idToast, {
                          render: "Logado com sucesso!", 
                          type: "success", 
                          isLoading: false, 
                          autoClose: 1500}
                        );
                        history.push("/user");
                      }else{
                        toast.update(idToast, {
                          render: "Erro ao sincroizar usuário", 
                          type: "error", 
                          isLoading: false, 
                          autoClose: 1500}
                        );
                      }
                  });
              }else {
                toast.update(idToast, {
                  render: "Acesso negado!", 
                  type: "error", 
                  isLoading: false, 
                  autoClose: 1500}
                );
                const errors = {
                    email: "Verifique se seu e-mail está correto!", 
                    password: "Verifique se sua senha está correta!"
                };
                actions.setErrors(errors);
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