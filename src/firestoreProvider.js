// Implement a firestore data provider for react-admin

import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';

// Firebase settings
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyD9avVEembD5Y-FFxjsN1f_FmLn3hHqzl8',
    authDomain: 'voltige-afdbf.firebaseapp.com',
    databaseURL: 'https://voltige-afdbf.firebaseio.com',
    projectId: 'voltige-afdbf',
    storageBucket: '',
    messagingSenderId: '403976155357'
});
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// Utility function to flatten firestore objects, since 'id' is not a field
function getDataWithId(DocumentSnapshot) {
    var dataWithId = {}
    // console.log('getDataWithId Id=', DocumentSnapshot.id)
    if (DocumentSnapshot) {
        dataWithId =  {
            id : DocumentSnapshot.id,
            ...DocumentSnapshot.data()
        }
    }
    // console.log(dataWithId);
    return dataWithId
}

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export const firestoreProvider = (type, resource, params) => {
    console.log(type, resource);
    console.log(params);
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            // query all the docs from the first to page*perPage
            var query = field === 'id' ? db.collection(resource).limit(page*perPage) : db.collection(resource).limit(perPage).orderBy(field, order.toLowerCase())
            return query.get()
                        .then( firtsDocumentsSnapshots => {
                            // slice the results 
                            var totalCount = firtsDocumentsSnapshots.docs.length;
                            var firstDocToDisplayCount = page === 1 ? 1 : Math.min( (page-1)*perPage , totalCount )
                            var firstDocToDisplay = firtsDocumentsSnapshots.docs.slice(firstDocToDisplayCount-1);

                            console.log('totalCount : ',totalCount );
                            console.log('firstDocToDisplayCount : ',firstDocToDisplayCount );

                            return {
                                data: firstDocToDisplay.map( doc => getDataWithId(doc) ),
                                total: totalCount
                            }

                        })
        }

        case GET_ONE: {
            return db.collection(resource)
                        .doc(params.id)
                        .get()
                        .then( doc => {
                            if (doc.exists) {
                                return { data : getDataWithId(doc) };
                            } else {
                                throw new Error({ message:'No such doc', status: 404});
                            }
                        })
                        .catch( error => {
                            throw new Error({ message:error, status:404});
                        });
        }
            
        case CREATE: {
            return db.collection(resource)
                    .add(params.data)
                    .then( DocumentReference => 
                        DocumentReference
                        .get()
                        .then( DocumentSnapshot => { return { data : getDataWithId(DocumentSnapshot)} })
                    )
        }

        case UPDATE: {
            return db.collection(resource)
                        .doc(params.id)
                        .set(params.data)
                        .then( () => { return { data : params.data } } )
        }

        case UPDATE_MANY: {
            return params.ids.map( id => 
                db.collection(resource)
                        .doc(id)
                        .set(params.data)
                        .then( () => id )
            )

        }

        case DELETE: {
            console.log('Delete record id', params.id)
            return db.collection(resource)
                        .doc(params.id)
                        .delete()
                        .then( () => { return { data :  params.previousData } } )
        }

        case DELETE_MANY: {
            return { 
                data : params.ids.map( id => 
                                    db
                                    .collection(resource)
                                    .doc(id)
                                    .delete()
                                    .then( () => id )
                )
            }
        }
        
        case GET_MANY: {
            // Do not use FireStore Ref because react-admin will not be able to create or update
            // Use a String field containing the ID instead

            return Promise
                    .all(params.ids.map( id => db.collection(resource).doc(id).get() ))
                    .then(arrayOfResults => {
                        console.log('arrayOfResults :',arrayOfResults)
                        return {
                            data : arrayOfResults.map( documentSnapshot => getDataWithId(documentSnapshot) ) 
                        }
                    
                    });

        }

        case GET_MANY_REFERENCE: {
           
            const { target, id } = params;
            const { field, order } = params.sort;
            return db.collection(resource)
                    .where(target, "==", id)
                    .orderBy(field, order.toLowerCase())
                    .get()
                    .then( QuerySnapshot =>
                        {
                            return {
                                data : QuerySnapshot.docs.map( DocumentSnapshot => getDataWithId(DocumentSnapshot) ),
                                total : QuerySnapshot.docs.length
                            }
                        }
                    );

        }

        default: {
            throw new Error(`Unsupported Data Provider request type ${type}`);
        }
    }

};

