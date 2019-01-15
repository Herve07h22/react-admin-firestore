import React from 'react';
import { Admin, Resource } from 'react-admin';
import { firestoreProvider, firebaseAuthProvider } from './firestoreProvider';
import { CompetitionList, CompetitionEdit, CompetitionCreate } from './Competitions';
import { InscriptionList, InscriptionEdit, InscriptionCreate } from './Inscriptions';

const dataProvider = firestoreProvider;

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={firebaseAuthProvider}>
      <Resource name="competition" list={CompetitionList} edit={CompetitionEdit} create={CompetitionCreate} />
      <Resource name="inscription" list={InscriptionList} edit={InscriptionEdit} create = {InscriptionCreate} />
      <Resource name="categorie" />
      <Resource name="concours" />
      <Resource name="ecurie" />
  </Admin>
);

export default App;
