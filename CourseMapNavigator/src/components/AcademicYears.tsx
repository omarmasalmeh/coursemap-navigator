import './AcademicYears.css';
import {  IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AcademicYearListItem {
  Id: string;
  Title: string
}


const AcademicYears: React.FC = () => {

  const [academicYears, setAcademicYears] = useState<AcademicYearListItem[]>([]);

  const getAcademicYearsData: () => Promise<AcademicYearListItem[]> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/academicyears/`)
    return res.data
  }

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getAcademicYearsData()
     setAcademicYears(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getAcademicYearsData()
    setAcademicYears(data)
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
        academicYears.map(year => {
          return (
            <IonItem
              button
              detail
              routerLink={`/academicyears/${year.Id}`}
              key={year.Id}>
              <IonLabel>{year.Title}</IonLabel>
            </IonItem>
          )
        })
      }

    </IonList>
    </>
  );
};

export default AcademicYears;
