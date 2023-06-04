import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Avatar, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import ChartBarUser from '../components/user/ChartBarUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserState, setUserState } from '../features/userReducer';
import MenuChangeUser from '../components/user/MenuChangeUser';
import ChartInfoDataBase from '../components/user/ChartInfoDataBase';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router';
import { getUserStorage } from '../services/UserStorage';


const PageUser: React.FC = () => {
  const history = useHistory();
  const userStorage = getUserStorage();

  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  if(userStorage.firstname.length > 0 && user.firstname.length === 0){
    dispatch(setUserState(userStorage));
  }else if(user.firstname.length == 0){
    history.push("/login");
  }

  return (
    <IonPage>
      <IonHeader>
        <div className="ion-toolbar-page">
          <div className="ion-toolbar-page-left">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <Typography sx={{color: 'black', marginTop: '8px'}} variant="h6" component="h6">
              Meu Cadastro
              </Typography>
          </div>
          <div className="ion-toolbar-page-rigth">
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen>
        <Grid container spacing={{ xs: 1, md: 4}}>
          <Grid item xs={12}>
            <Card className="card">
              <CardContent className="card-content-user">
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" spacing={1}>
                    {user?.iconImage64 ? 
                      <Avatar alt="" src={user?.iconImage64} />
                      : 
                      <Avatar sx={{ bgcolor: '#188268' }}>
                        <PersonIcon />
                      </Avatar>
                    }
                    <Typography sx={{color: 'black'}} variant="h5" component="h5">
                      {user?.firstname} {user?.lastname}
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
                Seu Consumo diário
              </Typography>
              <CardContent className="google-chart-user">
                <ChartBarUser />
              </CardContent>
            </Card>
            <Card className="card">
              <Typography sx={{marginLeft: '10px', marginTop: '10px'}} variant="h6" component="h6" >
                Base de Dados 
              </Typography>
              <CardContent className="google-chart-info-data-base">
                <ChartInfoDataBase />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </IonContent>
    </IonPage>
  );
};

export default PageUser;
