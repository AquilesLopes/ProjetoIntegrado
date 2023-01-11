import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalChangerDataUser from './ModalChangerDataUser';
import ModalChangerPassword from './ModalChangerPassword';
import ModalChangerImageUser from './ModalChangerImageUser';

const ITEM_HEIGHT = 48;
export default function MenuChangeUser() {
  const [changeDataUser, setChangeDataUser] = React.useState(false);
  const [changePasswordUser, setChangePasswordUser] = React.useState(false);
  const [changeImageUser, setChangeImageUser] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setAnchorEl(null);
  }, [changeDataUser, changePasswordUser, changeImageUser]);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => setChangeDataUser(true)}>
            Atualizar Dados
        </MenuItem>
        <MenuItem onClick={() => setChangePasswordUser(true)}>
            Alterar Password
        </MenuItem>
        <MenuItem onClick={() => setChangeImageUser(true)}>
            Alterar Imagem
        </MenuItem>
      </Menu>

      <ModalChangerDataUser open={changeDataUser} setOpen={setChangeDataUser} />
      <ModalChangerPassword open={changePasswordUser} setOpen={setChangePasswordUser} />
      <ModalChangerImageUser open={changeImageUser} setOpen={setChangeImageUser} />
      
    </div>
  );
}