import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AdvisingAssignments from '../components/AdvisingAssignments';
import './AdvisingAssignmentsPage.css';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  Id: string;
}


const AdvisingAssignmentsPage: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Advising Assignments Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <AdvisingAssignments Id={props.match.params.Id}/>
      </IonContent>
    </IonPage>
  );
};

export default AdvisingAssignmentsPage;
