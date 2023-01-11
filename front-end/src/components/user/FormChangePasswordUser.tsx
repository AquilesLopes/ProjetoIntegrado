import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CardContent, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { hasErrosInputs } from '../../util/util';
import { toast } from 'react-toastify';

interface IFormRegister {
  password: string,
  passwordConfirmation: string,
}

const initialValues : IFormRegister = {
  password: "",
  passwordConfirmation: ""
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

export default function FormChangePasswordUser(arg : any) {
  const [formValid, setFormValid] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  function handleChangeShowPassword(){
    setShowPassword(showPassword ? false : true);
  }

  function handleChangeShowPasswordConfirmation(){
    setShowPasswordConfirmation(showPasswordConfirmation ? false : true);
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {name: "", lastname: "", email: "", password: "", passwordConfirmation: ""};
          errors.password = validatePassword(values.password);

          if(errors.password.length === 0 && values.passwordConfirmation !== values.password){
             errors.passwordConfirmation = "A confirmação de senha deve ser igual a senha";
          }else{
            errors.passwordConfirmation = "";
          }

          if(hasErrosInputs(errors)){
            setFormValid(false);
          }else{
            setFormValid(true);
          }

          return hasErrosInputs(errors) ? errors : {};
        }}

        onSubmit={(values, { setSubmitting }) => {
          arg.setOpen(false);
          const idToast = toast.loading("Enviando...");
          setTimeout(() => {

            toast.update(idToast, {
              render: "Senha alterada com sucesso!", 
              type: "success", 
              isLoading: false, 
              autoClose: 1500}
            );

            setSubmitting(false);
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
              <Button sx={{margin: '10px'}} onClick={() => arg.setOpen(false)} variant="contained" color="error">
                <CancelIcon sx={{marginRight: '5px'}} /> Cancelar 
              </Button>
              <Button sx={{margin: '10px'}} disabled={!formValid} type="submit" 
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