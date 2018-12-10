//UTILITIES
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import firebase from 'firebase';

const API_KEY = 'Gi3vw65phOWmDXPv0klIVzvpDL8t3epU';

export default class Discover extends Component {

  constructor(props){
    super(props);

    this.state= {
      favoriteGifs:[], 
      loading:true, 
      userId: '', 
      colorTop: new Animated.Value(0)
    }

    this.fetchFavoriteGifs = this.fetchFavoriteGifs.bind(this);
  }

  componentDidMount(){
     this.cycleAnimationHeader();
     AsyncStorage.getItem('userId').then(value => {
       this.fetchFavoriteGifs(value);
       this.setState({userId: value})
     });
      
  }

  cycleAnimationHeader(){
      Animated.sequence([
      Animated.timing(this.state.colorTop, {
        toValue: 1,
        duration: 3000,
        delay: 3000, 
        easing: Easing.bezier(0.12, 0.56, 0.89, 0.49)
    }),
      Animated.timing(this.state.colorTop, {
        toValue: 0,
        duration: 3000,
        easing: Easing.bezier(0.12, 0.56, 0.89, 0.49)
    })
  ]).start(() => {
    this.cycleAnimationHeader();
  })
  }

  fetchFavoriteGifs = (userId) => {
    
    firebase.database().ref('users/'+userId+'/likes').on('value', snapshot => {
      if(snapshot.val()){
        let favGifs = [];
        snapshot.forEach(child => {
             const id = child.val();         
             const url = 'http://api.giphy.com/v1/gifs/'+id+'?api_key='+API_KEY;
             
             fetch(url)
                .then(response => {return response.json()})
                .then(response => {
                  let gif = response.data;

                  favGifs.push({
                    url: gif.images.fixed_width.url,
                    id: gif.id
                  })
                  this.setState({favoriteGifs: favGifs})//order chronologically
                })
         });        
      }
      else{
        this.setState({favoriteGifs: []})
      }
      this.setState({loading:false}) 
    })  
  }  

  renderItem = ({item}) => (
    <TouchableOpacity activeOpacity={0.8} delayLongPress={3000} onLongPress={() => this.dislikeGif(item.id)} style={{width: 320, height:320, borderRadius:20, borderWidth: 5, margin: 20, alignItems:'center', justifyContent:'center'}}>
       <Image source={{uri: item.url}} style={{height: 320, width:320, borderRadius:20, resizeMode:'cover', borderWidth: 5, borderColor:'#FB6769'}} />
    </TouchableOpacity>
  );

  dislikeGif = (id) => {
    firebase.database().ref('users/'+this.state.userId+'/likes').once('value', snap => {
        snap.forEach(child => {
          if(child.val() === id)
              firebase.database().ref('users/'+this.state.userId+'/likes').child(child.key).remove();
        })
      });
  }

  ListHeader = () => {
    return{
        color:this.state.colorTop.interpolate({
              inputRange: [0,1],
              outputRange: ['#fff', "#FB6769"]
        }),
        fontSize:24,
        width:'100%',
        textAlign:'center',
        padding:16, 
        fontFamily:'natureBeauty',
        backgroundColor: '#000',
        position:'absolute',
        top:0
        }
  }

  handleScroll = e => {
    this.scroll.scrollTo({x: 0, y: e.nativeEvent.contentOffset.y / 10, animated:true})
  }

  render() {
    const { favoriteGifs, loading } = this.state;
    const favorites = favoriteGifs.reverse();
    if(loading){
      return(<View style={styles.containerWhite}>
                <Image source={require('../assets/loader.gif')} style={{width:'100%', height:'100%'}} />
             </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <Animated.Text style={this.ListHeader()}>Your  Favorites  Puppies !</Animated.Text>

        <View style={{width:'100%', height:'100%', zIndex:4, position:'absolute', top:60}}>
                <ScrollView
                    contentContainerStyle={{alignItems:'center'}}
                    ref={y => {this.scroll = y}}
                    >
                    <Image source={require('../assets/hearts.png')} style={{height: 800, width:380, resizeMode:'cover'}} />
                </ScrollView>

            </View>
            <View style={{width:'100%', height:'100%', zIndex:8, position:'absolute', top:60, alignItems:'center'}}>
              <FlatList 
                  data={favorites}
                  style={{ flex:1}}
                  indicatorStyle='black'
                  onScroll={this.handleScroll}
                  renderItem= {this.renderItem}
                  keyExtractor={gif => gif.id}
              />
            </View>
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
    justifyContent: 'center'
  },
  containerWhite: {
    flex: 1,
    backgroundColor: '#fff',
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
