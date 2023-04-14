import './AdvisingAssignments.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface DetailsProps {
  Id: string;
}

interface AdvisingAssignmentsDetails {
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
  ]
}

const AdvisingAssignments: React.FC<DetailsProps> = ({ Id }) => {

  const [advisingAssignments, setAdvisingAssignments] = useState<AdvisingAssignmentsDetails>();

  const getAdvisingAssignments: () => Promise<AdvisingAssignmentsDetails> = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/instructors/${Id}`)
    return res.data
  }

  //called when component first loads
  useEffect(() => {
    //make api call to get teh products
    (async () => {
     const data = await getAdvisingAssignments()
     setAdvisingAssignments(data)
    })()

  }, [])

  //called when pull-to-refresh happen
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    const data = await getAdvisingAssignments()
    setAdvisingAssignments(data)
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
        advisingAssignments?.AdvisingAssignments.map(adv => {
          return (
            <IonItem
              key={advisingAssignments?.Id}
              >
              <IonLabel>{adv?.Diploma} - {adv?.AcademicYear} - {adv?.Year} - {adv?.Section}</IonLabel>
            </IonItem>
          )
        })
      }

    </IonList>
    </>
  );
};

export default AdvisingAssignments;
