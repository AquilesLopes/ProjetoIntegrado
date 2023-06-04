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
import { updatePassword } from '../../services/UserService';

interface IFormRegister {
  oldPassword: string,
  newPassword: string,
  passwordConfirmation: string,
}

const initialValues : IFormRegister = {
  oldPassword: "",
  newPassword: "",
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
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  function handleChangeShowOldPassword(){
    setShowOldPassword(showOldPassword ? false : true);
  }

  function handleChangeShowNewPassword(){
    setShowNewPassword(showNewPassword ? false : true);
  }

  function handleChangeShowPasswordConfirmation(){
    setShowPasswordConfirmation(showPasswordConfirmation ? false : true);
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {oldPassword: "", newPassword: "", passwordConfirmation: ""};
          errors.oldPassword = validatePassword(values.oldPassword);
          errors.newPassword = validatePassword(values.newPassword);

          if(errors.newPassword.length === 0 && values.passwordConfirmation !== values.newPassword){
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

        onSubmit={(values, actions) => {
          const idToast = toast.loading("Enviando...");

          updatePassword(values.oldPassword, values.newPassword)
          .then((res : any) => {
              actions.setSubmitting(false);
              if(res.status === 200){
                arg.setOpen(false);
                toast.update(idToast, {
                  render: "Senha alterada com sucesso!", 
                  type: "success", 
                  isLoading: false, 
                  autoClose: 1500}
                );
              }else {
                toast.update(idToast, {
                  render: "Erro ao tentar alterar a senha!", 
                  type: "error", 
                  isLoading: false, 
                  autoClose: 1500}
                );
                const errors = {
                  oldPassword: "A senha atual é inválida!", 
                  newPassword: "",
                  passwordConfirmation: ""
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
            <FormControl fullWidth variant="outlined">
              <InputLabel error={touched.oldPassword && hasErros(errors.oldPassword)}  
                          htmlFor="password">Senha atual</InputLabel>
              <OutlinedInput
                  id="oldPassword"
                  fullWidth
                  type={showOldPassword ? 'text' : 'password'}
                  value={values.oldPassword}
                  label="Senha atual"
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.oldPassword && hasErros(errors.oldPassword)} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleChangeShowOldPassword}
                        onMouseDown={handleChangeShowOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
              />
              <FormHelperText error id="password-error">
                {errors.newPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel error={touched.newPassword && hasErros(errors.newPassword)}  
                          htmlFor="password">Nova senha</InputLabel>
              <OutlinedInput
                  id="newPassword"
                  fullWidth
                  type={showNewPassword ? 'text' : 'password'}
                  value={values.newPassword}
                  label="Nova senha"
                  onChange={handleChange} onBlur={handleBlur}
                  error={touched.newPassword && hasErros(errors.newPassword)} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleChangeShowNewPassword}
                        onMouseDown={handleChangeShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
              />
              <FormHelperText error id="password-error">
                {errors.newPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel error={touched.passwordConfirmation && hasErros(errors.passwordConfirmation)}  
                          htmlFor="passwordConfirmation">Confirmação de senha</InputLabel>
              <OutlinedInput
                  id="passwordConfirmation"
                  fullWidth
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  value={values.passwordConfirmation}
                  label="Confirmação de senha"
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