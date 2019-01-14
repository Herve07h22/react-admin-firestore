import React from 'react';
import { Admin, Resource } from 'react-admin';
import { firestoreProvider } from './firestoreProvider';
import { CompetitionList, CompetitionEdit, CompetitionCreate } from './Competitions';
import { InscriptionList, InscriptionEdit, InscriptionCreate } from './Inscriptions';

const dataProvider = firestoreProvider;

const App = () => (
  <Admin dataProvider={dataProvider}>
      <Resource name="competition" list={CompetitionList} edit={CompetitionEdit} create={CompetitionCreate} />
      <Resource name="inscription" list={InscriptionList} />
      <Resource name="categorie" />
      <Resource name="concours" />
  </Admin>
);

export default App;
