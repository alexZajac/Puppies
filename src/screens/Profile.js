//UTILITIES
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import firebase from 'firebase';


export default class Profile extends Component {

  constructor(props){
    super(props);

    this.state = { 
      photoURL: '',
      username: '', 
      userId:'', 
      numberGifs:0
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('userId').then((value)=> {
      firebase.database().ref('users/'+value).once('value', snap => {
          this.setState({photoURL: snap.val().photoURL, username: snap.val().username, userId: value});
      })
      firebase.database().ref('users/'+value+'/numberGifs').on('value', snap => {
      this.setState({numberGifs: snap.val()})
    })
    })
    
    
    
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  render() {
  const { photoURL, username, numberGifs } = this.state;
  const date = new Date().getFullYear();
  const usernameTab = username.split(' ');
  let newTab = [];
  usernameTab.forEach(word => {newTab.push(word.charAt(0).toUpperCase() + word.substr(1))})
  const cleanUser = newTab.join(' ');

    return (
      <View style={styles.container}>
        <Image source={{uri: photoURL}} style={{width: 120, height: 120, position:'absolute', top:40, }} />
        <Text style={{fontSize: 40, color:'white', position:'absolute', top:170, fontFamily:'natureBeauty', padding:20}}>{cleanUser}</Text>
        <Text style={{fontSize: 50, color:'#9CFFE4', position:'absolute', top:260, fontFamily: 'Signatra', padding:10}}>{ numberGifs } Gifs watched !</Text>
        <TouchableOpacity onPress={this.signOut} style={{width:320, height:80, position:'absolute', bottom:120, backgroundColor: '#9CFFE4', alignItems: 'center', justifyContent: 'center', borderRadius:200}}>
            <Text style={{ padding:20, fontSize:30, fontFamily:'natureBeauty'}}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 8, position:'absolute', bottom:20, color:'#555555'}}>Project originally made for MA 21st Birthday by Alexandre Zajac @ {date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
