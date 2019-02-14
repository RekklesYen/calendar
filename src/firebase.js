import firebase from 'firebase'
import 'firebase/firestore'
var config = {
  apiKey: 'AIzaSyDvCcX-9xoc7M5mAUmlXENJhWh-Qt1K1hQ',
  authDomain: 'vuetodoapp-3c409.firebaseapp.com',
  databaseURL: 'https://vuetodoapp-3c409.firebaseio.com',
  projectId: 'vuetodoapp-3c409',
  storageBucket: 'vuetodoapp-3c409.appspot.com',
  messagingSenderId: '439072284249'
}
const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()

export default firestore
