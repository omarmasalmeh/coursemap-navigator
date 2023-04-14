import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Diplomas from '../components/Diplomas';
import './DiplomasPage.css';

const DiplomasPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Diplomas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Diplomas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Diplomas/>
      </IonContent>
    </IonPage>
  );
};

export default DiplomasPage;
