import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';


export default class Login extends Component {

  constructor(props){
    super(props);

    this.state= {
      
    }
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  async loginWithFacebook() {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('358223261667977',{ permissions: ['public_profile'] });

      if(type == 'success'){
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(error => alert(error))
      }
      
  }

  async loginWithGoogle() {
      const { type, idToken, accessToken } = await Google.logInAsync({
          iosClientId:'995769136515-odtcq4j7so6jj6pi0l0ovg9jh88uev0g.apps.googleusercontent.com',
          scopes:['profile','email']
        });

      if(type == 'success'){

        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase.auth().signInWithAndRetrieveDataCredential(credential).catch(error => alert(error.message))
        
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ListHeader}>Login to unlock Puppies !</Text>

        <Image source={require('../assets/facebook.png')} style={{width:80, height:80, position:'absolute', top: 88}} />
        <TouchableOpacity onPress={this.loginWithFacebook} style={styles.fb}>
                <Text style={{fontSize:24, fontFamily:'natureBeauty', color:'white', padding:10}}>Login With Facebook</Text>
        </TouchableOpacity>

        <Text style={{fontSize:30, fontFamily:'natureBeauty', color:'white'}}>or</Text>

        <Image source={require('../assets/google.png')} style={{width:100, height:100, position:'absolute', bottom: 50}} />
        <TouchableOpacity onPress={this.loginWithGoogle} style={styles.google}>
                <Text style={{fontSize:24, color:'white', fontFamily:'natureBeauty', padding:10}}>Login With Google</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:'natureBeauty'
  },
  ListHeader: {
    color:'white',
    fontSize:28,
    padding:20, 
    margin:20,
    fontFamily:'natureBeauty', 
    top:0,
    position:'absolute'
  },
  fb: {
    borderRadius: '50%',
    width: 320,
    height:100,
    position:'absolute',
    top:180,
    backgroundColor:'#38569E',
    color:'white', 
    fontFamily:'natureBeauty',
    alignItems: 'center',
    justifyContent: 'center',
  },
  google :{
    borderRadius: '50%',
    width: 320,
    height:100,
    position:'absolute',
    bottom:180,
    backgroundColor: '#EB4134',
    color:'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
