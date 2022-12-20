import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { IonItem } from '@ionic/react';
import { useHistory } from 'react-router';

export default function ItemsVisitor({setAnchorEl} : any) {
  const history = useHistory();

  function redirectToPageLogin(){
    setAnchorEl(null);
    history.push("/login");
  }

  function redirectToPageRegister(){
    setAnchorEl(null);
    history.push("/register");
  }

  return (
    <React.Fragment>
        <MenuItem onClick={redirectToPageLogin}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon> 
          Login
        </MenuItem>
        <MenuItem onClick={redirectToPageRegister}>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon> 
            Criar Conta
        </MenuItem>
    </React.Fragment>
  );
}