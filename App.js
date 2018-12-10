//UTILITIES

import React, { Component } from 'react';
import { Text, View, Image, SafeAreaView, AsyncStorage } from 'react-native';
import { Asset, Font } from 'expo';
import firebase from './src/config/firebase';

//COMOPONENTS
import SplashScreen from './src/components/Splashscreen';
import AppTabNavigator from './src/components/TabNavigator';
import Login from './src/screens/Login';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderSplash: true,
      user:false
    };
  }

  componentWillMount(){
    this.loadRessourcesAsync();
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({user: true})
        firebase.database().ref('users/'+user.uid).update({
              username: user.displayName,
              photoURL: user.photoURL
        });
        this.storeUser(user);
      }
      else{
        this.setState({user: false})
      }
    })
  }

  componentDidMount() {
    setTimeout(() => this.setState({ renderSplash: false }), 3000); //Splashscreen  
  }

  loadRessourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/dogs.png'),
        require('./src/assets/hearts.png'),
      ]),
      Font.loadAsync({
        natureBeauty: require('./src/assets/fonts/NatureBeauty.ttf'),
        Signatra: require('./src/assets/fonts/Signatra.ttf')
      }),
    ]);
  }

    storeUser = async (user) => {
    try {
          await AsyncStorage.setItem('userId', user.uid)
        }
        catch(error) {
          alert(error)
        }
  }

  render() {
    const { renderSplash, user } = this.state;
    if (renderSplash) {
        return <SplashScreen />;
      }
    if(user){
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <AppTabNavigator />
        </SafeAreaView>
      );
      }
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <Login />
      </SafeAreaView>
    );
    }
    
}
