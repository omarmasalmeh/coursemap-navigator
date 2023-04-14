import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CoursesTaught from '../components/CoursesTaught';
import './CoursesTaughtPage.css';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  Id: string;
}


const CoursesTaughtPage: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Courses Taught</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
         <CoursesTaught Id={props.match.params.Id} />
      </IonContent>
    </IonPage>
  );
};

export default CoursesTaughtPage;
