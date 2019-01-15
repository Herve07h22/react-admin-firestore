import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  FileField,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  DateField,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  FileInput
} from 'react-admin';

export const InscriptionList = props => (
  <List title="List des inscriptions" {...props}>
    <Datagrid>
      <ReferenceField label="Date compétition" source="competition" reference="competition">
          <DateField source="date" />
      </ReferenceField>
      <ReferenceField label="Ecurie" source="ecurie" reference="ecurie" linkType={false}>
          <TextField source="nom" />
      </ReferenceField>
      <ReferenceField label="Catégorie" source="categorie" reference="categorie" linkType={false}>
          <TextField source="nom" />
      </ReferenceField>
      <ReferenceField label="Concours" source="concours" reference="concours" linkType={false}>
          <TextField source="nom" />
      </ReferenceField>
      <TextField label="Cheval" source="cheval" />
      <TextField label="Longeur-euse" source="longe" />
      <FileField label="Entrée" source="MusiqueEntree.downloadURL" title="MusiqueEntree.nom" target="_blank"/>
      <FileField label="Thème" source="MusiqueTheme.downloadURL" title="MusiqueTheme.nom" target="_blank"/>
      <EditButton />
    </Datagrid>
  </List>
);


export const InscriptionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Compétition" source="competition" reference="competition">
        <SelectInput optionText="date" />
      </ReferenceInput>
      <ReferenceInput label="Ecurie" source="ecurie" reference="ecurie">
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <ReferenceInput label="Catégorie" source="categorie" reference="categorie" >
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <ReferenceInput label="Concours" source="concours" reference="concours">
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <TextInput  label="Cheval" source="cheval" />
      <TextInput  label="Longeur-euse" source="longe" />
      <ArrayInput label="Voltigeurs-euses" source="participants">
        <SimpleFormIterator>
          <TextInput source="nom" />
        </SimpleFormIterator>
      </ArrayInput>
      <FileInput source="MusiqueEntree" label="Musique entrée" accept="audio/*">
          <FileField source="src" title="nom" />
      </FileInput>
      <FileInput source="MusiqueTheme" label="Musique du thème" accept="audio/*">
          <FileField source="src" title="nom" />
      </FileInput>
    </SimpleForm>
  </Create>
);


export const InscriptionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput label="Compétition" source="competition" reference="competition">
        <SelectInput optionText="date" />
      </ReferenceInput>
      <ReferenceInput label="Ecurie" source="ecurie" reference="ecurie" >
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <ReferenceInput label="Catégorie" source="categorie" reference="categorie" >
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <ReferenceInput label="Concours" source="concours" reference="concours" >
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <TextInput  label="Cheval" source="cheval" />
      <TextInput  label="Longeur-euse" source="longe" />
      <ArrayInput label="Voltigeurs-euses" source="participants">
        <SimpleFormIterator>
          <TextInput source="nom" />
        </SimpleFormIterator>
      </ArrayInput>
      <FileInput source="MusiqueEntree" label="Musique entrée" accept="audio/*">
          <FileField source="src" title="nom" />
      </FileInput>
      <FileInput source="MusiqueTheme" label="Musique du thème" accept="audio/*">
          <FileField source="src" title="nom" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
