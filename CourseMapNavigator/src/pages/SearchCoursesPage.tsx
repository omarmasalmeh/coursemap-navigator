import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SearchCourses from '../components/SearchCourses';
import './SearchCoursesPage.css';

const AcademicYearsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Academic Years</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SearchCourses/>
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearsPage;
