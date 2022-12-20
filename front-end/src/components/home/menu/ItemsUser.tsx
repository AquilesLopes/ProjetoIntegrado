import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { removeUserStorage } from '../../../services/UserStorage';
import BadgeIcon from '@mui/icons-material/Badge';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setUserState } from '../../../features/userReducer';
import { cleanStorage } from '../../../util/util';

export default function ItemsUser({setAnchorEl} : any) {
  const history = useHistory();
  const dispatch = useAppDispatch();

  function redirectToPageUser(){
    setAnchorEl(null);
    history.push("/user");
  }

  function exitSystem(){
    setAnchorEl(null);
    const idToast = toast.loading("Removendo dados do navegador...");
    cleanStorage();
    dispatch(setUserState(undefined));
    setTimeout(() => {
      toast.update(idToast, {render: "Removido com sucesso!", type: "success", isLoading: false, autoClose: 1500});
      history.push("/");
    }, 2000);
  }

  return (
    <React.Fragment>
        <MenuItem onClick={redirectToPageUser}>
          <ListItemIcon>
            <BadgeIcon fontSize="small" />
          </ListItemIcon>
          Meu Cadastro
        </MenuItem>
        <Divider />
        <MenuItem onClick={exitSystem}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
    </React.Fragment>
  );
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
