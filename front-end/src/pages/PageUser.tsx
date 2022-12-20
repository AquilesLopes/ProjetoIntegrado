import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { getUserStorage } from '../services/UserStorage';
import React from 'react';
import ChartBarUser from '../components/user/ChartBarUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserState, setUserState } from '../features/userReducer';

const PageUser: React.FC = () => {
  const userUserStorage = getUserStorage();
  
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  if(userUserStorage !== null && userUserStorage !== undefined){
     if(user === undefined || user === null){
        dispatch(setUserState(userUserStorage));
     }
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
              <CardContent>
                <Typography sx={{marginLeft: '10px', marginTop: '10px'}} variant="h6" component="h6" >
                  {user?.name} {user?.lastname}
                </Typography>
                <Typography>
                  {user?.email}
                </Typography>
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
