import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import logo from '../../../assets/icon/playstore.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import ItemsVisitor from './ItemsVisitor';
import ItemsUser from './ItemsUser';
import { getUserStorage } from '../../../services/UserStorage';
import { CONFIG } from '../../../util/config';

import userAvatar from '../../../assets/img/user_avatar.png'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUserState, setUserState } from '../../../features/userReducer';
import { isMobile } from '../../../util/util';

const userDefaults = {
  name: '',
  email: '',
  lastname: '',
};

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const userStorage = getUserStorage();
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  if(userStorage !== null && userStorage !== undefined){
     if(user === undefined || user === null){
        dispatch(setUserState(userStorage));
     }
  }

  return (
    <AppBar id="app-bar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar id="menu-bar-toolbar" disableGutters>
      
          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={0.5}>
              <Avatar alt="" src={logo} />
              <Typography sx={{color: 'black'}} variant="h5" component="h5">
                  {CONFIG.nameSystem}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? 
              <Stack direction="row" sx={{cursor: "pointer"}} spacing={0.5} onClick={handleOpenMenu}>
                <Avatar alt="" src={userAvatar} />
                {isMobile ? <></>
                :
                  <Typography sx={{color: 'black'}} variant="h6" component="h6">
                    {user.name}
                  </Typography>
                }
              </Stack>
            :
              <IconButton sx={{marginRight: '10px'}} onClick={handleOpenMenu}>
                  <MenuOpenIcon />
              </IconButton>
            }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
            {user ?
              <ItemsUser setAnchorEl={setAnchorEl} />
              : 
              <ItemsVisitor setAnchorEl={setAnchorEl} />
            }
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

