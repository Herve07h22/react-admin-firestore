import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, SimpleForm, DateField, TextInput, DateInput, FileInput, FileField, ImageField } from 'react-admin';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import PlaceIcon from '@material-ui/icons/Place';
import Avatar from '@material-ui/core/Avatar';
import get from 'lodash/get';


const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const cardMediaStyle = {
  height: 0,
  paddingTop: '56.25%', // 16:9
};

const EcurieGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
    {ids.map(id =>
        <Card key={id} style={cardStyle}>
            <CardHeader
                title={ get(data[id], "nom") }
                subheader={ get(data[id], "adresse") } 
                avatar={
                  <Avatar aria-label="Complexe hippique">
                    <PlaceIcon />
                  </Avatar>
                }
            />
            <CardMedia style={cardMediaStyle} image={get(data[id], "photo.downloadURL")} />
            
            <CardContent>
                <TextField record={data[id]} source="description" />
            </CardContent>
            
            <CardActions style={{ textAlign: 'right' }}>
                <EditButton resource="ecurie" basePath={basePath} record={data[id]} />
            </CardActions>
        </Card>
    )}
    </div>
);

EcurieGrid.defaultProps = {
    data: {},
    ids: [],
};

export const EcurieList = (props) => (
    <List title="Les écuries de voltige équestre" {...props}>
        <EcurieGrid />
    </List>
);

export const EcurieCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput  label="Nom" source="nom" />
      <TextInput  label="Adresse" source="adresse" />
      <TextInput  label="Description" source="description" />
      <FileInput source="photo" label="Photo de centre" accept="image/*">
          <FileField source="src" title="nom" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const EcurieEdit = props => (
  <Edit {...props}>
    <SimpleForm>
    <TextInput  label="Nom" source="nom" />
      <TextInput  label="Adresse" source="adresse" />
      <TextInput  label="Description" source="description" />
      <FileInput source="photo" label="Photo de centre" accept="image/*">
          <FileField source="src" title="nom" />
      </FileInput>
    </SimpleForm>
  </Edit>
);


