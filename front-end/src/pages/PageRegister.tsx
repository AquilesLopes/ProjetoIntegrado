import { IonCardTitle, IonContent, IonHeader, IonPage, IonTitle } from '@ionic/react';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';

import FormRegister from '../components/register/FormRegister';
import PolicyIcon from '@mui/icons-material/Policy';
import { CONFIG } from '../util/config';

const PageRegister: React.FC = () => {
  return (
    <IonPage >
        <div className="main-banner-register">
          <Grid container className="grid-register" spacing={{ xs: 1, md: 4}}>
            <Grid item xs={12} md={4}>
              <div className="card glass-effect">
                  <Typography className="title-form" variant="h4" component="h4">
                    <PolicyIcon fontSize="inherit" color="success" /> {CONFIG.nameSystem}
                  </Typography>
                  <FormRegister />
              </div>
            </Grid>
          </Grid>
        </div>
    </IonPage>
  );
};

export default PageRegister;
