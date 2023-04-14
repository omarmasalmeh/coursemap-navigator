import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { fileTrayStackedOutline, bookOutline, calendarOutline, peopleOutline } from 'ionicons/icons';

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
import SemstersPage from './pages/SemstersPage';
import AcademicYearsPage from './pages/AcademicYearsPage';
import CoursesTaughtPage from './pages/CoursesTaughtPage';
import CoursesPage from './pages/CoursesPage'
import SearchCoursesPage from './pages/SearchCoursesPage';
import DiplomasPage from './pages/DiplomasPage';
import AcademicAdvisorsPage from './pages/AcademicAdvisorsPage';
import AdvisingAssignmentsPage from './pages/AdvisingAssignmentsPage';
import InstructorsPage from './pages/InstructorsPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/academicyears" component={AcademicYearsPage} />
          <Route exact path="/academicyears/:Id" component={SemstersPage} />
          <Route exact path="/academicyears/semesters/:Id" component={CoursesTaughtPage} />
          <Route exact path="/academicyears/semesters/courses/:Id" component={CoursesPage} />
          <Route exact path="/courses" component={SearchCoursesPage} />
          <Route exact path="/courses/:Id" component={CoursesPage} />
          <Route exact path="/diplomas" component={DiplomasPage} />
          <Route exact path="/diplomas/:Id" component={AcademicAdvisorsPage} />
          <Route exact path="/diplomas/instructors/:Id" component={AdvisingAssignmentsPage} />
          <Route exact path="/instructors" component={InstructorsPage} />
          <Route exact path="/instructors/:Id" component={CoursesTaughtPage} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="academicyearsTab" href="/academicyears">
            <IonIcon aria-hidden="true"  icon={ calendarOutline} />
            <IonLabel>Academic Years</IonLabel>
          </IonTabButton>
          <IonTabButton tab="coursesTab" href="/courses">
            <IonIcon aria-hidden="true" icon={bookOutline} />
            <IonLabel>Search Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="diplomasTab" href="/diplomas">
            <IonIcon aria-hidden="true" icon={fileTrayStackedOutline} />
            <IonLabel>Diploma Programs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="instructorsTab" href="/instructors">
            <IonIcon aria-hidden="true" icon={peopleOutline} />
            <IonLabel>Instructors</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
