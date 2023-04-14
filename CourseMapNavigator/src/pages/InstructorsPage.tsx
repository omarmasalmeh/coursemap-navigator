import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Instructors from '../components/Instructors';
import './InstructorsPage.css';

const InstructorsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Instructors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Instructors</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Instructors />
      </IonContent>
    </IonPage>
  );
};

export default InstructorsPage;
