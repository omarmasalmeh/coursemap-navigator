import './CoursesTaught.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface DetailsProps {
  Id: string;
}

interface semestersCoursesTaughtDetails {
  Id: string;
  Name: string;
  StartDate: string;
  EndDate: string;
  AcadamicYear: string;
  CoursesTaught: [
    {
      Id:string;
      CourseCode: string;
      Title: string;
    }
  ];
}

interface instructorsCoursesTaughtDetails {
  Id: string;
  FirstName: string;
  LastName: string;
  AdvisingAssignments: [
    {
      AcademicYear: string;
      Diploma: string;
      Year: string;
      Section: string;
    }
  ];
  CoursesTaught: [
    {
      Id:string;
      CourseCode: string;
      Title: string;
    }
  ];
}

interface noData {
  value: string;
  CoursesTaught?: [];
}


const CoursesTaught: React.FC<DetailsProps> = ({ Id }) => {

  const location = useLocation();
  const from = new URLSearchParams(location.search).get('from');
 
  
  // This function checks if the "from" parameter is equal to "semesters"
function isSemesters(from: string): from is "semesters" {
  return from === "semesters";
}

// This function checks if the "from" parameter is equal to "instructors"
function isTeachers(from: string): from is "instructors" {
  return from === "instructors";
}

// This state variable will hold the courses taught details and can be of either the "semesters" or "instructors" type
const [coursesTaught, setCoursesTaught] = useState<semestersCoursesTaughtDetails | instructorsCoursesTaughtDetails | noData>();
// Define the "empty" state variable
const [empty, setEmpty] = useState<noData>({ value: "No courses taught available" });
// This function retrieves the courses taught details from the API and returns it as either the "semesters" or "instructors" type
const getCoursesTaught = async (): Promise<semestersCoursesTaughtDetails | instructorsCoursesTaughtDetails| noData> => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/${from}/${Id}`);

   // If the API call returns no data, set the "empty" state to the specified value
   if (res.data.CoursesTaught.length === 0) {
    setEmpty({ value: "No courses taught available" });
    return { value: "" };
  }
  
  // If "from" is equal to "semesters", return the data as "semestersCoursesTaughtDetails"
  if (isSemesters(from!!)) {
    return res.data as semestersCoursesTaughtDetails;
  }
  // If "from" is equal to "instructors", return the data as "instructorsCoursesTaughtDetails"
  else if (isTeachers(from!!)) {
    return res.data as instructorsCoursesTaughtDetails;
  }
  // If "from" is neither "semesters" nor "instructors", throw an error
  else {
    throw new Error(`Invalid value for "from": ${from}`);
  }
}


  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getCoursesTaught()
     setCoursesTaught(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getCoursesTaught()
    setCoursesTaught(data)
    event.detail.complete();
    
  }

 
  return (
    //return a list
    
    <>
    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
 
    {from === 'semesters' ? (
  !coursesTaught?.CoursesTaught ? (
    <IonList>
      <IonLabel>{empty.value}</IonLabel>
    </IonList>
  ) : (
    <IonList>
      {coursesTaught.CoursesTaught.map((course) => (
        <IonItem 
          button 
          detail 
          routerLink={`/academicyears/semesters/courses/${course.Id}`}
          key={course.Id}
        >
          <IonLabel>
            {course?.CourseCode} - {course?.Title}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
) : from === 'instructors' ? (
  !coursesTaught?.CoursesTaught ? (
    <IonList>
      <IonLabel>{empty.value}</IonLabel>
    </IonList>
  ) : (
    <IonList>
      {coursesTaught.CoursesTaught.map((course) => (
        <IonItem 
          key={course.Id}
        >
          <IonLabel>
            {course?.CourseCode} - {course?.Title}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
) : (
  <div>Invalid value of "from" prop.</div>
)}


  </>
  );
};

export default CoursesTaught;
