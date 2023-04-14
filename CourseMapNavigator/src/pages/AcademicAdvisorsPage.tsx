import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AcademicAdvisors from '../components/AcademicAdvisors';
import './AcademicAdvisorsPage.css';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  Id: string;
}


const AcademicAdvisorsPage: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Academic Advisors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <AcademicAdvisors Id={props.match.params.Id}/>
      </IonContent>
    </IonPage>
  );
};

export default AcademicAdvisorsPage;
