import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FindCaepiUser from '../components/home/find_caepi/FindCaepiUser';
import IonHeaderPage from '../components/IonHeaderPage';
import { getUserState, setUserState } from '../features/userReducer';
import { getUserStorage } from '../services/UserStorage';

export default function FindCaepiPage () {
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
      <IonHeaderPage titlePage={"Pesquisar CA"} />

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

