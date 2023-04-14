import './Diplomas.css';
import {  IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DiplomasList {
  Id: string;
  Title: string
  Duration: string;
}


const Diplomas: React.FC = () => {

  const [diplomas, setDiplomas] = useState<DiplomasList[]>([]);

  const getDiplomas: () => Promise<DiplomasList[]> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/diplomas/`)
    return res.data
  }

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getDiplomas()
     setDiplomas(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getDiplomas()
    setDiplomas(data)
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
        diplomas.map(diploma => {
          return (
            <IonItem
              button
              detail
              routerLink={`/diplomas/${diploma.Id}`}
              key={diploma.Id}>
              <IonLabel>{diploma.Title} - {diploma.Duration}</IonLabel>
            </IonItem>
          )
        })
      }

    </IonList>
    </>
  );
};

export default Diplomas;
