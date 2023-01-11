import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FindCaepiUser from '../components/home/find_caepi/FindCaepiUser';
import { getUserState, setUserState } from '../features/userReducer';
import { getUserStorage } from '../services/UserStorage';

export default function FindCaepiPage () {
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
          <IonTitle>Pesquisar CAEPI</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <FindCaepiUser />
      </IonContent>
    </IonPage>
  );
};

