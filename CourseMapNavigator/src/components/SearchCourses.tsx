import './SearchCourses.css';
import {  IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonSearchbar, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface coursesListItem  {
  [x: string]: any;
  Id: string;
  CourseCode: string;
  Title: string;
  }


const SearchCourses: React.FC = () => {
  const [allCourses, setAllCourses] = useState<coursesListItem[]>([]);
  const [searchCourses, setSearchCourses] = useState<coursesListItem[]>([]);
  const getcoursesList: () => Promise<coursesListItem[]> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/`)
    return res.data
  }

  const handleClear = () => {
    setSearchCourses(allCourses);
  };

  const handleChange = (ev: CustomEvent) => {
    const query = ev.detail.value?.toLowerCase() || "";
    const filteredCourses = allCourses.filter(
      (course) =>
        course.Title.toLowerCase().includes(query) ||
        course.CourseCode.toLowerCase().includes(query)
    );
    setSearchCourses(filteredCourses);
  };

  
  

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getcoursesList()
     setAllCourses(data)
     setSearchCourses(data); //initialize searchCourses with all the courses

    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getcoursesList()
    setAllCourses(data)
    setSearchCourses(data); //initialize searchCourses with all the courses
    event.detail.complete();

  }
 

  return (
    //return a list
    <>
    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
    <IonSearchbar
        debounce={1000}
        onIonChange={handleChange}
        onIonClear={handleClear}
      />
      <IonList>
        {searchCourses.map((course) => (
          <IonItem
            button
            detail
            routerLink={`/courses/${course.Id}`}
            key={course.Id}
          >
            <IonLabel>
              {course.Title} - {course.CourseCode}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default SearchCourses;
