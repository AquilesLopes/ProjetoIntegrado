import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { archiveOutline, searchOutline, search, exit,  archiveSharp, bookmark, paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';
import { CONFIG } from '../util/config';
import { toast } from 'react-toastify';
import { setUserState } from '../features/userReducer';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import HistoryIcon from '@mui/icons-material/History';
import { getCaepiStorage } from '../services/CaepiStorage';
import { cleanStorage, emptyUser, formatCNPJ } from '../util/util';
import { getHistoricCaepiState, setHistoricCaepiState } from '../features/historicCaepiReducer';
import { useEffect } from 'react';
import { getUserStorage } from '../services/UserStorage';
import { getUserLogged } from '../services/UserService';
import { setSearchState } from '../features/searchStateReducer';
import { ISearch } from '../interface/ISearch';

import BiotechIcon from '@mui/icons-material/Biotech';
import BusinessIcon from '@mui/icons-material/Business';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import PolicyIcon from '@mui/icons-material/Policy';
 
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Pesquisar',
    url: '/find',
    iosIcon: searchOutline,
    mdIcon: search
  },
  {
    title: 'Meu cadastro',
    url: '/user',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  }
];

function showMenuBar(pathname : string){
    if(pathname === '/find' || pathname === '/user'){
      return true;
    } else {
      return false;
    }
}

export default function Menu(){
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const researches : ISearch[] = useAppSelector(getHistoricCaepiState);

  if(researches.length === 0 && getCaepiStorage().length > 0){
     dispatch(setHistoricCaepiState(getCaepiStorage()));
  }

  console.log(researches);

  function exitSystem(){
    const idToast = toast.loading("Removendo dados do navegador...");
    cleanStorage();
    dispatch(setUserState(emptyUser()));
    dispatch(setHistoricCaepiState([]));
    setTimeout(() => {
      toast.update(idToast, {render: "Removido com sucesso!", type: "success", isLoading: false, autoClose: 1500});
      history.push("/");
    }, 2000);
  }

  function findHistoryCaepi(search : ISearch){
    toast("Pesquisando...", { autoClose: 1000 });
    if(location.pathname !== '/find'){
      history.push("/find");
    }
    setTimeout(function(){ 
      dispatch(setSearchState(search));
    }, 1000);
  }

  useEffect(() => {
    const userStorage = getUserStorage();
    if(userStorage.email.length > 0){
        getUserLogged().then((res : any) => {
            if(res.status !== 200){
                cleanStorage();
                dispatch(setUserState(emptyUser()));
                dispatch(setHistoricCaepiState([]));
                if(location.pathname === '/user' || location.pathname === '/find'){
                    history.push("/login");
                }
            }
        });
    }
  });

  return (
    <IonMenu className={showMenuBar(location.pathname) ? "ion-menu" : "hide-element"} contentId="main">
    <IonContent className="ion-menu-bg">
      <IonList className="ion-menu-bg">
        <div className="ion-menu-div">
          <span className="ion-menu-title">{CONFIG.nameSystem}</span>
          
          <PolicyIcon className="ion-menu-logo-alt" />
        </div>
        {appPages.map((appPage, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={location.pathname === appPage.url ? 'ion-item-selected ion-item' : 'ion-item'} 
                       routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" color="#fff" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel className="ion-label-icon-title">{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
      </IonList>

      <IonList className="ion-menu-bg" id="labels-list">
        <IonListHeader><HistoryIcon sx={{marginRight: '5px'}} /> Histórico</IonListHeader>
        {researches.map((search) => (
          <IonMenuToggle key={search.type === 'R' ? search.number : search.cnpj} autoHide={false}>
            <IonItem lines="none" className="ion-item-caepi" onClick={() => findHistoryCaepi(search)}>
              {search.type === 'number' ? <InsertDriveFileIcon sx={{fontSize: '14px', color: search.color}} /> : <></>}
              {search.type === 'manufacturer' ? <BusinessIcon sx={{fontSize: '14px', color: search.color}} /> : <></>}
              {search.type === 'laboratory' ? <BiotechIcon sx={{fontSize: '14px', color: search.color}} /> : <></>}
              <IonLabel className="ion-label-icon-title">
                {search.type === 'number' ? search.number : formatCNPJ(search.cnpj)}
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        ))}
      </IonList>

      <IonMenuToggle className="btn-menu-exit" key="exit" autoHide={false}>
        <IonItem className='ion-item' onClick={exitSystem} routerDirection="none" lines="none" detail={false}>
          <IonLabel className="ion-label-icon-title">Sair</IonLabel>
          <IonIcon slot="start" color="#fff" ios={exit} md={exit} />
        </IonItem>
      </IonMenuToggle>
    </IonContent>
    </IonMenu>
  );
};
