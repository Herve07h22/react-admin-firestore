import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { firestoreProvider } from './firestoreProvider';
import { CompetitionList, CompetitionEdit, CompetitionCreate } from './Competitions';
import { InscriptionList, InscriptionEdit, InscriptionCreate } from './Inscriptions';

const dataProvider = firestoreProvider();

const App = () => (
  <Admin dataProvider={dataProvider}>
      <Resource name="competitions" list={CompetitionList} edit={CompetitionEdit} create={CompetitionCreate} />
      <Resource name="inscriptions" list={InscriptionList} edit={InscriptionEdit} create={InscriptionCreate} />
  </Admin>
);

export default App;
