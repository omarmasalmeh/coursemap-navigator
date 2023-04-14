import './Instructors.css';
import {  IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface InstructorsListItem {
  Id: string;
  FirstName: string;
  LastName: string;
}


const Instructors: React.FC = () => {

  const [instructors, setInstructors] = useState<InstructorsListItem[]>([]);

  const getInstructors: () => Promise<InstructorsListItem[]> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/instructors/`)
    return res.data
  }

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getInstructors()
     setInstructors(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getInstructors()
    setInstructors(data)
    event.detail.complete();

  }
 

  return (
    //return a list
    <>
    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
      <IonRefresherContent></IonRefresherContent>
    </IonRefresher>
    <IonList>
      {
        instructors.map(instructor => {
          return (
            <IonItem
              button
              detail
              routerLink={`/instructors/${instructor.Id}?from=instructors`}
              key={instructor.Id}>
              <IonLabel>{instructor.FirstName} {instructor.LastName}</IonLabel>
            </IonItem>
          )
        })
      }

    </IonList>
    </>
  );
};

export default Instructors;
