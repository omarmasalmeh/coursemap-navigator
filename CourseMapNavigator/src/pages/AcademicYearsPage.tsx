import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AcademicYears from '../components/AcademicYears';
import './AcademicYearsPage.css';

const AcademicYearsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Academic Years</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Academic Years</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AcademicYears/>
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearsPage;
