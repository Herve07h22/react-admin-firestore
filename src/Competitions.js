import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, DateField } from 'react-admin';

export const CompetitionList = props => (
  <List title="List des compétitions" {...props}>
    <Datagrid>
      <TextField source="lieu" />
      <DateField source="date" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CompetitionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextField source="lieu" />
      <DateField source="date" />
    </SimpleForm>
  </Edit>
);

export const CompetitionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextField source="lieu" />
      <DateField source="date" />
    </SimpleForm>
  </Create>
);
