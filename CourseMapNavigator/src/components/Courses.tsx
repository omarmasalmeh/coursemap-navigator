import './Courses.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface DetailsProps {
  Id: string;
}

interface courseDetails {
  Id: string;
  Title: string;
  CourseCode: string;
  CoursePrerequisites?: [
    {
      Id: string;
      CourseCode: string;
      Title: string;
      }
  ];
  IsPrerequisiteFor?: [
    {
      Id: string;
      CourseCode: string;
      Title: string;
      }
  ];
}


interface noDataPrerequisites {
  value: string;
  CoursePrerequisites?: [
    {
      Id: string;
      CourseCode: string;
      Title: string;
      }
  ];
}

interface noDataPrerequisiteFor {
  value: string;
  IsPrerequisiteFor?: [
    {
    Id: string;
    CourseCode: string;
    Title: string;
    }
  ];
}


const Courses: React.FC<DetailsProps> = ({ Id }) => {

// This state variable will hold the courses taught details and can be of either the "semesters" or "instructors" type
const [courses, setCourses] = useState<courseDetails>();
// Define the "empty" state variable
const [emptyPer, setEmptyPer] = useState<noDataPrerequisites>({ value: "", CoursePrerequisites: undefined });
const [emptyPerFor, setEmptyPerFor] = useState<noDataPrerequisiteFor>({ value: "", IsPrerequisiteFor: undefined });
// This function retrieves the courses taught details from the API and returns it as either the "semesters" or "instructors" type
const getCourses = async (): Promise<courseDetails | undefined> => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${Id}`);

  if (res.data.CoursePrerequisites?.length === 0) {
    setEmptyPer({ value: "No Course Prerequisites Available", CoursePrerequisites: undefined });
  }

  if (res.data.IsPrerequisiteFor?.length === 0) {
    setEmptyPerFor({ value: "No Course PrerequisiteFor Available", IsPrerequisiteFor: undefined });
  }

  setCourses(res.data as courseDetails);

  return res.data as courseDetails;
}


  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getCourses()
     setCourses(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getCourses()
    setCourses(data)
    event.detail.complete();
    
  }

 
  return (
    //return a list
    
    <>
  <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
    <IonRefresherContent></IonRefresherContent>
  </IonRefresher>
  {emptyPer.value && (
    <IonList>
     
      <IonLabel>
      Notice: {emptyPer.value}
      </IonLabel>
    </IonList>
  )}
  {emptyPerFor.value && (
    <IonList>
   
      <IonLabel>
      Notice: {emptyPerFor.value}
      </IonLabel>
    </IonList>
  )}
  {courses && (
    <IonList>
      <p>Course Name and Code:</p>
        <IonItem key={courses.Id}>
          <IonLabel>
           {courses.CourseCode} - {courses.Title}
          </IonLabel>
        </IonItem>
    
      <p>Course Prerequisites:</p>
      {courses.CoursePrerequisites?.map((prerequisite: { Id: string; CourseCode: string; Title: string }) => (
        <IonItem key={prerequisite.Id}>
          <IonLabel>
           {prerequisite.CourseCode} - {prerequisite.Title}
          </IonLabel>
        </IonItem>
      ))}
        <p>Course Prerequisite For:</p>
      {courses.IsPrerequisiteFor?.map((prerequisite: { Id: string; CourseCode: string; Title: string }) => (
        <IonItem  key={prerequisite.Id}>
          <IonLabel>
            {prerequisite.CourseCode} - {prerequisite.Title}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  )}
</>

  );
};

export default Courses;
