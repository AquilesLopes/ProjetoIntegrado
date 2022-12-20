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
import { archiveOutline, searchOutline, search, exit,  archiveSharp, bookmark, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { CONFIG } from '../util/config';
import { toast } from 'react-toastify';
import { removeUserStorage } from '../services/UserStorage';
import { setUserState } from '../features/userReducer';
import { useAppDispatch } from '../app/hooks';
import HistoryIcon from '@mui/icons-material/History';
import { getCaepiStorage } from '../services/CaepiStorage';
import { caepiValid, cleanStorage } from '../util/util';
import { setFindCaepiState } from '../features/findCaepiReducer';

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
    if(pathname === '/' || pathname === '/login' || pathname === '/register'){
      return false;
    }
    return true;
}

export default function Menu(){
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const listCaepi = getCaepiStorage();

  function exitSystem(){
    const idToast = toast.loading("Removendo dados do navegador...");
    cleanStorage();
    dispatch(setUserState(undefined));
    setTimeout(() => {
      toast.update(idToast, {render: "Removido com sucesso!", type: "success", isLoading: false, autoClose: 1500});
      history.push("/");
    }, 2000);
  }

  function findHistoryCaepi(number : number){
    dispatch(setFindCaepiState(""));
    if(location.pathname !== '/find'){
       toast("Redirecionando...", { autoClose: 1500 });
       history.push("/find");
       setTimeout(() => {
        dispatch(setFindCaepiState(number + ""));
       }, 1500);
    }else {
      dispatch(setFindCaepiState(number + ""));
    }
  }

  return (
    <IonMenu className={showMenuBar(location.pathname) ? "ion-menu" : "hide-element"} contentId="main">
    <IonContent>
      <IonList id="inbox-list">
        <IonListHeader>{CONFIG.nameSystem}</IonListHeader>
        {appPages.map((appPage, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel className="ion-label-icon">{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          );
        })}
        <IonMenuToggle key="exit" autoHide={false}>
          <IonItem className='ion-item-exit' onClick={exitSystem} routerDirection="none" lines="none" detail={false}>
            <IonIcon slot="start" ios={exit} md={exit} />
            <IonLabel className="ion-label-icon">Sair</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>

      <IonList id="labels-list">
        <IonListHeader><HistoryIcon /> Histórico</IonListHeader>
        {listCaepi.map((caepi) => (
          <IonItem lines="none" className="cursor-point"
            onClick={() => findHistoryCaepi(caepi.number)} key={caepi.number}>
            <IonIcon color={caepiValid(caepi.status) ? "success" : "danger"} 
                     slot="start" icon={bookmark} />
            <IonLabel className="ion-label-icon">{caepi.number}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
    </IonMenu>
  );
};
