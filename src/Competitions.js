import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, SimpleForm, DateField, TextInput, DateInput } from 'react-admin';

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
      <TextInput source="lieu" />
      <DateInput source="date" />
    </SimpleForm>
  </Edit>
);

export const CompetitionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="lieu" />
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);
