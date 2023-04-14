import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Courses from '../components/Courses';
import './CoursesPage.css';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  Id: string;
}


const CoursesPage: React.FC<RouteComponentProps<RouteParams>> = (props) => {
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Course Details Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
         <Courses Id={props.match.params.Id} />
      </IonContent>
    </IonPage>
  );
};

export default CoursesPage;
