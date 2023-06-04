import { Avatar, Stack, Typography } from '@mui/material';
import { getUserStorage } from '../services/UserStorage';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserState, setUserState } from '../features/userReducer';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router';
import { isMobile } from '../util/util';
import { IonButtons, IonHeader, IonMenuButton, IonTitle } from '@ionic/react';

export default function IonHeaderPage(args : any) {
  const history = useHistory();

  const userStorage = getUserStorage();
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  if(userStorage.firstname.length > 0 && user.firstname.length === 0){
    dispatch(setUserState(userStorage));
  }

  function redirectToPageUser(){
    history.push("/user");
  }

  return (
    <IonHeader>
      <div className="ion-toolbar-page">
        <div className="ion-toolbar-page-left">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <Typography sx={{color: 'black', marginTop: '8px'}} variant="h6" component="h6">
              {args.titlePage}
            </Typography>
        </div>
        <div className="ion-toolbar-page-rigth">
          <Stack className="stack-avatar-user" direction="row" onClick={redirectToPageUser} spacing={1}>
            <Typography sx={{color: 'black', marginTop: '3px'}} variant="h6" component="h6">
                {user.firstname} {isMobile ? '' : user.lastname}
            </Typography>
            {user?.iconImage64 ? 
              <Avatar alt="" src={user?.iconImage64} />
              : 
              <Avatar sx={{ bgcolor: '#188268' }}>
                <PersonIcon />
              </Avatar>
            }
          </Stack>
        </div>
      </div>
    </IonHeader>
  );
}