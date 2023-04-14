import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Semesters from '../components/Semsters';
import './SemstersPage.css';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  Id: string;
}


const SemestersPage: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Semesters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <Semesters Id={props.match.params.Id}/>
      </IonContent>
    </IonPage>
  );
};

export default SemestersPage;
