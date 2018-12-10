import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBc7m234mSMrcPCNzkJqQCWHXMNsSlzJvw',
  authDomain: 'puppiiesapp.firebaseapp.com',
  databaseURL: 'https://puppiiesapp.firebaseio.com',
  projectId: 'puppiiesapp',
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
