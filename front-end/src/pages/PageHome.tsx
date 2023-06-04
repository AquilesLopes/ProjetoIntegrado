import { IonContent, IonPage } from '@ionic/react';
import CardSimplePractical from '../components/home/CardSimplePractical';
import CardInfoApi from '../components/home/CardInfoApi';

import { Avatar, Button, CardContent, Grid, Stack, Tooltip, Typography } from '@mui/material';
import Footer from '../components/home/Footer';
import { useHistory } from 'react-router';
import { getUserStorage } from '../services/UserStorage';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserState, setUserState } from '../features/userReducer';
import userAvatar from '../assets/img/user_avatar.png';
import FindCaepiHome from '../components/home/find_caepi/FindCaepiHome';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CardContentCaepi from '../components/home/documentation/CardContentCaepi';
import ExampleResponseGetCaepi from '../components/home/documentation/ExampleResponseGetCaepi';
import { toast } from 'react-toastify';
import PersonIcon from '@mui/icons-material/Person';
import Fade from '@mui/material/Fade';
import { CONFIG } from '../util/config';
 
const PageHome: React.FC = () => {
  const history = useHistory();

  function redirectToPageLogin(){
    history.push("/login");
  }

  function redirectToPageRegister(){
    history.push("/register");
  }

  function redirectToPageUser(){
    history.push("/user");
  }

  function openDocumentation(){
    window.open(`${CONFIG.urlBase}/${CONFIG.doc}`, "_blank");
  }

  const userStorage = getUserStorage();
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  if(userStorage.firstname.length > 0 && user.firstname.length === 0){
    dispatch(setUserState(userStorage));
  }

  return (
    <IonPage>
      <IonContent className="ion-content" fullscreen>
          <div className="main-banner">
              <Grid container spacing={2}>
                {user.firstname.length === 0 ?
                  <Grid item xs={12}>
                    <Button className='btn-login' onClick={redirectToPageLogin}
                            color="warning" variant="contained" size="small">
                      Login
                    </Button>
                    <Button className='btn-new-user'  onClick={redirectToPageRegister}
                            color="warning" variant="outlined" size="small">
                      Criar conta
                    </Button>
                  </Grid>
                : 
                  <Stack className="stack-avatar-user" direction="row" 
                         onClick={redirectToPageUser} spacing={0.5}>
                    {user?.iconImage64 ? 
                      <Avatar alt="" src={user?.iconImage64} />
                      : 
                      <Avatar sx={{ bgcolor: '#188268' }}>
                        <PersonIcon />
                      </Avatar>
                    }
                    <Typography sx={{color: 'black'}} variant="h6" component="h6">
                        {user.firstname}
                    </Typography>
                  </Stack>
                }
              </Grid>
              <Grid className='grid-text' container spacing={2}>
                  <Grid item xs={12}>
                    <p><span className="color-black">Verifique a validade</span></p>
                    <p>
                      <span className="color-black">do seu </span> 
                      <span className="secondary-color bold">
                        Certificado 
                        <Tooltip title="Equipamento de proteção individual" 
                          TransitionComponent={Fade} 
                          disableFocusListener arrow>
                          <span className="secondary-color bold"> EPI</span>
                        </Tooltip>
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                      <FindCaepiHome />
                  </Grid>
              </Grid>
          </div>
            
          <CardContent className="card-info-api">
            <span>
              Fornecemos dados com os principais indicadores e informações, <br></br> 
              para deixar sua aplicação <b>completa</b>, <b>moderna</b> e <b>atualizada</b>.
            </span>
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

          <CardContentCaepi />

          <ExampleResponseGetCaepi />

          <CardContent className="footer-info-api">
            <p>Veja nossa documentação completa</p>
            <span>Nossa documentação é simples e intuitiva, veja como é simples integrar sua aplicação.</span>
            <span>Clara, simples e objetiva, feita de desenvolvedor para desenvolvedor.</span>

            <Button className='btn-view-doc-api' onClick={openDocumentation}
                    variant="contained" size="small">
              Ver documetação <KeyboardArrowRightIcon />
            </Button>
          </CardContent>

          <Footer />
      </IonContent>
    </IonPage>
  );
};

export default PageHome;
