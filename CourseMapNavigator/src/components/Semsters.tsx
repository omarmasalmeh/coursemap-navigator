import './Semsters.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface DetailsProps {
  Id: string;
}

interface SemestersDetails {
  Id: string;
  Title: string;
  Semesters: [{Name:string}];
  AdvisingAssignments: [];
}

const Semesters: React.FC<DetailsProps> = ({ Id }) => {

  const [semester, setSemester] = useState<SemestersDetails>();

  const getSemestersData: () => Promise<SemestersDetails> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/academicyears/${Id}`)
    return res.data
  }

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getSemestersData()
     setSemester(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getSemestersData()
    setSemester(data)
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
        semester?.Semesters.map(semest => {
          return (
            <IonItem
              button
              detail
              routerLink={`/academicyears/semesters/${semester.Id}?from=semesters`}
              key={semest?.Name}
              >
              <IonLabel>{semest?.Name}</IonLabel>
            </IonItem>
          )
        })
      }

    </IonList>
    </>
  );
};

export default Semesters;
