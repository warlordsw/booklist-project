//FIREBASE FIRESTORE CONFIG - CONNECTION

import Firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCyFJUawbD0cty6XlEHp4VELbP-k8gYysI',
  authDomain: 'book-project-3b680.firebaseapp.com',
  projectId: 'book-project-3b680',
  storageBucket: 'book-project-3b680.appspot.com',
  messagingSenderId: '546702915857',
  appId: '1:546702915857:web:0620365b7a58d4fb9e34b0',
  measurementId: 'G-P9K23W418T',
}

export const firebase = Firebase.initializeApp(config)
export const { FieldValue } = Firebase.firestore
