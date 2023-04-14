import './AcademicAdvisors.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface DetailsProps {
  Id: string;
}

interface AcademicAdvisorsDetails {
  Id: string;
  Title: string;
  Advisors: [
    {
      AcademicYear: string;
      Year: string;
      Id:string;
      Section: string;
      Advisor: string;
    }
  ]
}

const AcademicAdvisors: React.FC<DetailsProps> = ({ Id }) => {

  const [academicAdvisors, setAcademicAdvisors] = useState<AcademicAdvisorsDetails>();

  const getAcademicAdvisors: () => Promise<AcademicAdvisorsDetails> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/diplomas/${Id}`)
    return res.data
  }

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getAcademicAdvisors()
     setAcademicAdvisors(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getAcademicAdvisors()
    setAcademicAdvisors(data)
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
        academicAdvisors?.Advisors.map(adv => {
          return (
            <IonItem
              button
              detail
              routerLink={`/diplomas/instructors/${adv?.Id}`}
              key={adv?.Id}
              >
              <IonLabel>{adv?.Advisor} - {adv?.AcademicYear} - {adv?.Year} - {adv?.Section}</IonLabel>
            </IonItem>
          )
        })
      }

    </IonList>
    </>
  );
};

export default AcademicAdvisors;
