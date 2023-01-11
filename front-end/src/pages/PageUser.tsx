import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Avatar, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { getUserStorage } from '../services/UserStorage';
import React from 'react';
import ChartBarUser from '../components/user/ChartBarUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserState, setUserState } from '../features/userReducer';
import userAvatar from '../assets/img/user_avatar.png';
import MenuChangeUser from '../components/user/MenuChangeUser';
import { useHistory } from 'react-router';

const PageUser: React.FC = () => {
  const history = useHistory();
  const userStorage = getUserStorage();

  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  if(userStorage.name.length > 0 && user.name.length === 0){
     dispatch(setUserState(userStorage));
  }else if(user.name.length == 0){
     history.push("/");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meu Cadastro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Grid container spacing={{ xs: 1, md: 4}}>
          <Grid item xs={12}>
            <Card className="card">
              <CardContent className="card-content-user">
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <Avatar alt="" src={user?.image ? user?.image : userAvatar} />
                    <Typography sx={{color: 'black'}} variant="h5" component="h5">
                      {user?.name} {user?.lastname}
                    </Typography>
                  </Stack>
                  <Typography>
                    {user?.email}
                  </Typography>
                </Stack>
                <MenuChangeUser />
              </CardContent>
            </Card>
            <Card className="card">
              <Typography sx={{marginLeft: '10px', marginTop: '10px'}} variant="h6" component="h6" >
                Consumo diário
              </Typography>
              <CardContent className="google-chart">
                <ChartBarUser />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </IonContent>
    </IonPage>
  );
};

export default PageUser;
