import { IonContent, IonPage } from '@ionic/react';
import CardSimplePractical from '../components/home/CardSimplePractical';
import CardInfoApi from '../components/home/CardInfoApi';
import PolicyIcon from '@mui/icons-material/Policy';

import { scroollById } from '../util/util';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Documentation from '../components/home/documentation/Documentation';
import GridFindCaepi from '../components/home/find_caepi/GridFindCaepi';
import { useState } from 'react';
import Footer from '../components/home/Footer';
import InfoDocumentationFull from '../components/home/documentation/InfoDocumentationFull';
import MenuBar from '../components/home/menu/MenuBar';
 
const PageHome: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  if(loading){
    setTimeout(function(){ 
      if(loading){
        setLoading(false);
      }
    }, 2000);
  }

  return (
    <IonPage>
      <IonContent className="ion-content" fullscreen>
          <MenuBar />
          <div className="main-banner">
              <Grid className={loading ? "fadeout" : "grid fadein"} container spacing={2}>
                  <Grid item xs={12}>
                      <h2>Verifique a validade do seu</h2>
                      <h1>Certificado EPI</h1>
                  </Grid>
              </Grid>
            <div className="footer">
              <Button className={loading ? "fadeout" : "fadein"} disableElevation onClick={() => scroollById("info-find-caepi")} 
                      variant="contained" startIcon={<PolicyIcon />}>
                      Verificar
              </Button>
            </div>
          </div>
            
          <CardContent id="info-find-caepi" sx={{textAlign: 'center'}}>
            <Typography gutterBottom variant="h5" component="div">
              APIs para deixar seu produto completo e atualizado
            </Typography>
          </CardContent>

          <GridFindCaepi />

          <CardContent sx={{textAlign: 'center', marginTop: '30px'}}>
            <Typography gutterBottom variant="h5" component="div">
              Fornecemos dados com os principais indicadores e informações, para deixar sua 
              aplicação completa, moderna e atualizada.
            </Typography>
          </CardContent>

          <CardSimplePractical />

          <CardContent sx={{textAlign: 'center', marginTop: '30px'}}>
            <Typography gutterBottom variant="h5" component="div">
            </Typography>
          </CardContent>

          <CardInfoApi />

          <CardContent sx={{textAlign: 'center', marginTop: '30px'}}>
            <Typography gutterBottom variant="h5" component="div">
            </Typography>
          </CardContent>

          <Documentation />

          <InfoDocumentationFull />

          <Footer />
      </IonContent>
    </IonPage>
  );
};

export default PageHome;
