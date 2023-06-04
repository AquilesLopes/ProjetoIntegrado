import { IonPage } from '@ionic/react';
import { Grid, Typography } from '@mui/material';

import PolicyIcon from '@mui/icons-material/Policy';
import { CONFIG } from '../util/config';
import FormLogin from '../components/login/FormLogin';
import React from 'react';

const PageLogin: React.FC = () => {
  return (
    <IonPage>
        <div className="main-banner-login">
          <Grid container className="grid-login" spacing={{ xs: 1, md: 4}}>
            <Grid item xs={12} md={4}>
              <div className="card glass-effect">
                <Typography className="title-form" variant="h4" component="h4">
                  <PolicyIcon fontSize="inherit" color="success" /> {CONFIG.nameSystem}
                </Typography>
                <FormLogin />
              </div>
            </Grid>
          </Grid>
        </div>
    </IonPage>
  );
};

export default PageLogin;
