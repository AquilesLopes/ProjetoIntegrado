import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import Page from './pages/Page';
import PageHome from './pages/PageHome';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import FindCaepiPage from './pages/FindCaepiPage';
import Menu from './components/MenuIonic';
import PageRegister from './pages/PageRegister';
import PageUser from './pages/PageUser';
import { ToastContainer, toast } from 'react-toastify';

/* My SASS */
import '../src/sass/styles.scss';

/* React Toastify */
import 'react-toastify/dist/ReactToastify.css';
import PageLogin from './pages/PageLogin';
import { Provider } from 'react-redux';
import { store } from './app/store';

setupIonicReact();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <ToastContainer />
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <PageHome />
              </Route>
              <Route path="/register" exact={true}>
                <PageRegister />
              </Route>
              <Route path="/login" exact={true}>
                <PageLogin />
              </Route>
              <Route path="/find" exact={true}>
                <FindCaepiPage />
              </Route>
              <Route path="/user" exact={true}>
                <PageUser />
              </Route>
              <Route path="/page/:name" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
