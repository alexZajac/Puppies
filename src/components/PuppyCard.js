//UTILITIES
import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import firebase from 'firebase';

const randomPalette = ['#9740FA', '#FB6769', '#2AFC9C', '#FFF39F', '#22CDFB']

export default class PuppyCard extends Component {

  constructor(props){
    super(props);

    this.state= {
      liked: false,
      count: 0, 
      userId:''
    }
    this.id = this.props.id;
    this.url = this.props.url;
    this.color = randomPalette[Math.floor(Math.random() * 5)];

    this.likeGif = this.likeGif.bind(this);
    this.HandleLongPress = this.HandleLongPress.bind(this);
  }

  componentWillMount(){
    AsyncStorage.getItem('userId').then(value => {
         this.setState({userId:value});
     })
  }

  cardStyle = () => {
      
      return {
        margin:20,
        height: 380,
        width:320,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:this.state.liked ? this.color :'#000',
        borderRadius: 20,
        borderWidth:5,
        borderColor: this.color
      }  
  }

  UpvoteStyle = () => {
      return {
          height:60, 
          width:320, 
          color:'white', 
          borderRadius: 20,
          bottom:0, 
          position:'absolute',
          borderWidth:2,
          zIndex: 1,
          borderColor: this.color, 
          backgroundColor: this.color,
          alignItems: 'center',
          justifyContent:'center'
        }
  }

  GifStyle = () => {
    return{
      height:320,
      width:320,
      resizeMode:'cover',
      top:0,
      position:'absolute',
      borderRadius: 20, 
      zIndex:2,
    }
  }

  TouchableStyle = () => {
    return {
        height: 380,
        width:320,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        borderWidth:5,
        borderColor:this.color
    }
  }

  likeGif = () => {
    if(this.state.count === 1){
      this.setState({liked: true, count:2});
      const userId = this.state.userId

      let addToLikes = true;
      firebase.database().ref('users/'+userId+'/likes').once('value', snap => {
        snap.forEach(child => {
          if(child.val() === this.id)
              addToLikes = false;
        })
      })
      if(addToLikes){
            firebase.database().ref('users/'+userId+'/likes').push(this.id)
      }
      
      setTimeout(()=> {this.setState({count:0})}, 1200);
    }
    else  
      this.setState({count: 1})
  }

  HandleLongPress = () => {
    const userId = this.state.userId;
    firebase.database().ref('users/'+userId+'/likes').once('value', snap => {
        snap.forEach(child => {
          if(child.val() === this.id)
              firebase.database().ref('users/'+userId+'/likes').child(child.key).remove();
        })
        this.setState({liked: false, count:0});
      });
  }

  render() {
    const { liked, count } = this.state;
    const UpvoteComp = () => {
          return(<View style={this.UpvoteStyle()}>
                        <Image source={require('../assets/woofies.png')} style={{width: 320, height: 60, resizeMode:'cover'}} />
                </View>);
    }
    


    return (
         <View style={this.cardStyle()}>
             <TouchableHighlight underlayColor={this.color} onLongPress={() => this.HandleLongPress()} onPress={() => this.likeGif()} style = {this.TouchableStyle()}>
                <View style={{width:320, height:320, justifyContent: 'center', alignItems:'center'}}>
                  <Image source={{uri: this.url}} style={this.GifStyle()}/>
                  {count === 2 ? 
                    <Image source={require('../assets/woof.png')} style={{height:120, width: 120, zIndex:3}} /> 
                    : 
                    <View></View>
                  }
                </View>
             </TouchableHighlight>
             {liked ? <UpvoteComp/>
                      :
                      <View></View>
              }
         </View>
    );
  }
}

