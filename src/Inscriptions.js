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
  ArrayField,
  SingleFieldList,
  SelectInput
} from 'react-admin';

export const InscriptionList = props => (
  <List title="List des inscriptions" {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceInput label="Compétition" source="competition" reference="competition">
        <SelectInput optionText="Compétition" />
      </ReferenceInput>
      <ReferenceInput label="Ecurie" source="ecurie" reference="ecurie">
        <SelectInput optionText="Ecurie" />
      </ReferenceInput>
      <ReferenceInput label="Catégorie" source="categorie" reference="categorie">
        <SelectInput optionText="Catégorie" />
      </ReferenceInput>
      <ReferenceInput label="Concours" source="concours" reference="concours">
        <SelectInput optionText="Concours" />
      </ReferenceInput>
      <TextField label="Cheval" source="cheval" />
      <TextField label="Longeur-euse" source="longe" />
      <ArrayField label="Voltigeurs-euses" source="Noms">
        <SingleFieldList>
          <TextField source="Nom" />
        </SingleFieldList>
      </ArrayField>
      <EditButton />
    </Datagrid>
  </List>
);

export const InscriptionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Compétition" source="competition" reference="competition">
        <SelectInput optionText="Compétition" />
      </ReferenceInput>
      <ReferenceInput label="Ecurie" source="ecurie" reference="ecurie">
        <SelectInput optionText="Ecurie" />
      </ReferenceInput>
      <ReferenceInput label="Catégorie" source="categorie" reference="categorie">
        <SelectInput optionText="Catégorie" />
      </ReferenceInput>
      <ReferenceInput label="Concours" source="concours" reference="concours">
        <SelectInput optionText="Concours" />
      </ReferenceInput>
      <TextField label="Cheval" source="cheval" />
      <TextField label="Longeur-euse" source="longe" />
      <ArrayField label="Voltigeurs-euses" source="Noms">
        <SingleFieldList>
          <TextField source="Nom" />
        </SingleFieldList>
      </ArrayField>
      <FileField source="MusiqueEntree" title="Musique entrée" />
      <FileField source="MusiqueTheme" title="Musique du thème" />
    </SimpleForm>
  </Create>
);

export const InscriptionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput label="Compétition" source="competition" reference="competition">
        <SelectInput optionText="Compétition" />
      </ReferenceInput>
      <ReferenceInput label="Ecurie" source="ecurie" reference="ecurie">
        <SelectInput optionText="Ecurie" />
      </ReferenceInput>
      <ReferenceInput label="Catégorie" source="categorie" reference="categorie">
        <SelectInput optionText="Catégorie" />
      </ReferenceInput>
      <ReferenceInput label="Concours" source="concours" reference="concours">
        <SelectInput optionText="Concours" />
      </ReferenceInput>
      <TextField label="Cheval" source="cheval" />
      <TextField label="Longeur-euse" source="longe" />
      <ArrayField label="Voltigeurs-euses" source="Noms">
        <SingleFieldList>
          <TextField source="Nom" />
        </SingleFieldList>
      </ArrayField>
      <FileField source="MusiqueEntree" title="Musique entrée" />
      <FileField source="MusiqueTheme" title="Musique du thème" />
    </SimpleForm>
  </Edit>
);
