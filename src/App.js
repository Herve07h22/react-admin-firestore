import React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from './Dashboard';
import { firestoreProvider, firebaseAuthProvider } from './firestoreProvider';
import { CompetitionList, CompetitionEdit, CompetitionCreate } from './Competitions';
import { InscriptionList, InscriptionEdit, InscriptionCreate } from './Inscriptions';
import { EcurieList, EcurieCreate, EcurieEdit  } from './Ecuries';

import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/People';
import CalendarToday from '@material-ui/icons/Today';

const dataProvider = firestoreProvider;

const App = () => (
  <Admin title="Inscriptions aux compétitions de voltige é
  questre" dataProvider={dataProvider} authProvider={firebaseAuthProvider} dashboard={Dashboard} >
      <Resource name="inscription" list={InscriptionList} edit={InscriptionEdit} create = {InscriptionCreate} icon={UserIcon} options={{ label: 'Inscriptions' }} />
      <Resource name="competition" list={CompetitionList} edit={CompetitionEdit} create={CompetitionCreate} icon={CalendarToday} options={{ label: 'Compétitions' }} />
      <Resource name="ecurie" list={EcurieList} edit={EcurieEdit} create={EcurieCreate}  icon={HomeIcon} options={{ label: 'Les écuries' }} />
      <Resource name="categorie" />
      <Resource name="concours" />
     
  </Admin>
);

export default App;
