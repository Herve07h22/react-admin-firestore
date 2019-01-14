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

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export const firestoreProvider = (type, resource, params) => {
    
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            
            return db.collection(resource)
                        .orderBy(field, order)
                        .limit(perPage)
                        .get()
                        .then( firtsDocumentsSnapshots => {
                            // Get the last visible document
                            var totalCount = firtsDocumentsSnapshots.docs.length;
                            var firstDocToDisplayCount = page === 1 ? 1 : Math.min( (page-1)*perPage , totalCount )
                            var firstDocToDisplay = firtsDocumentsSnapshots.docs[firstDocToDisplayCount-1];

                            // Construct a new query starting at this document,
                            return db.collection(resource)
                                    .orderBy(field, order)
                                    .startAt(firstDocToDisplay)
                                    .limit(perPage)
                                    .get()
                                        .then( documentsSnapshots => {
                                            return {
                                                data: documentsSnapshots.docs.map( doc => doc.data()),
                                                total: totalCount
                                            }
                                        });
                            })
        }

        case GET_ONE: {
            return db.collection(resource)
                        .doc(params.id)
                        .get()
                        .then( doc => {
                            if (doc.exists) {
                                return { data : doc.data() };
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
                    .get()
                    .then( DocumentSnapshot =>{ data : DocumentSnapshot.data()})
        }

        case UPDATE: {
            return db.collection(resource)
                        .doc(params.id)
                        .set(params.data)
                        .get()
                        .then( DocumentSnapshot => { data : DocumentSnapshot.data()})
        }

        case UPDATE_MANY: {
            return params.ids.map( (id) => {
                db.collection(resource)
                        .doc(id)
                        .set(params.data)
                        .get()
                        .then( DocumentSnapshot => DocumentSnapshot.id)
            })

        }

        case DELETE: {
            var theDoc = db.collection(resource).doc(params.id);
            return theDoc.get()
                        .then ( DocumentSnapshot => 
                            theDoc.delete().then( () => { return { data : DocumentSnapshot.data() } } )
                        )
        }

        case DELETE_MANY: {
            return { 
                data : params.id.map( id => {
                                    db
                                    .collection(resource)
                                    .doc(id)
                                    .delete()
                                    .then( () => id )
                })
            }
        }
        
        case GET_MANY: {
            return { 
                data : params.id.map( id => {
                                    db.collection(resource)
                                    .doc(id)
                                    .get()
                                    .then( DocumentSnapshot => DocumentSnapshot.data())
                })
            }
        }

        case GET_MANY_REFERENCE: {
           
            const { target, id } = params;
            const { field, order } = params.sort;
            return db.collection(resource)
                    .where(target, "==", id)
                    .orderBy(field, order)
                    .get()
                    .then( QuerySnapshot =>
                        {
                            return {
                                data : QuerySnapshot.docs.map( DocumentSnapshot => DocumentSnapshot.data() ),
                                total : QuerySnapshot.docs.length
                            }
                        }
                    );

        }
        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};

