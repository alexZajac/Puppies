//UTILITIES
import React, { Component } from 'react';
import { StyleSheet, View, Image, FlatList, ImageBackground, AsyncStorage, ScrollView, Animated, Easing } from 'react-native';
import firebase from 'firebase';
import PuppyCard from '../components/PuppyCard';

const API_KEY = 'Gi3vw65phOWmDXPv0klIVzvpDL8t3epU';

export default class Discover extends Component {

  constructor(props){
    super(props);

    this.state= {
      gifsObjects:[], 
      loading:true, 
      userId: '',
      initialNumber: 0,
      colorTop: new Animated.Value(0), 
      animationValue: 1
    }

    this.fetchGifs = this.fetchGifs.bind(this);
  }

  componentDidMount(){
    this.cycleAnimationHeader();
    
    AsyncStorage.getItem('userId').then(value => {
       this.fetchGifs(); 
       firebase.database().ref('users/'+value+'/numberGifs').once('value',snap => {
         this.setState({initialNumber: snap.val(), userId:value});
       })
     }) 
  }

  cycleAnimationHeader(){
      Animated.sequence([
      Animated.timing(this.state.colorTop, {
        toValue: 1,
        duration: 6000,
        delay: 6000, 
        easing: Easing.bezier(0.12, 0.56, 0.89, 0.49)
    }),
      Animated.timing(this.state.colorTop, {
        toValue: 0,
        duration: 6000,
        easing: Easing.bezier(0.12, 0.56, 0.89, 0.49)
        
    })
  ]).start(() => {
    this.cycleAnimationHeader();
  })
  }

  fetchGifs = () => {
    let gifs = [];
    //PUPPIES
    const urlPuppies = 'http://api.giphy.com/v1/gifs/search?q=puppies&api_key='+API_KEY+'&limit=50000';
    fetch(urlPuppies)
        .then(response => {return response.json()})
        .then(response => {
            let newResp = response.data;

            newResp.forEach(gif => {
              gifs.push({
                id: gif.id, 
                url: gif.images.fixed_width.url
              })
            })  
        })
        .catch(error => alert(error));
    //PUPPY
    const urlPuppy = 'http://api.giphy.com/v1/gifs/search?q=puppy&api_key='+API_KEY+'&limit=50000';
    fetch(urlPuppy)
        .then(response => {return response.json()})
        .then(response => {
            let newResp = response.data;

            newResp.forEach(gif => {
              gifs.push({
                id: gif.id, 
                url: gif.images.fixed_width.url
              })
            })    
        })
        .catch(error => alert(error));
    //CUTE+Dog
    const urlCuteDog = 'http://api.giphy.com/v1/gifs/search?q=cute+dog&api_key='+API_KEY+'&limit=50000';
    fetch(urlCuteDog)
        .then(response => {return response.json()})
        .then(response => {
            let newResp = response.data;

            newResp.forEach(gif => {
              gifs.push({
                id: gif.id, 
                url: gif.images.fixed_width.url
              })
            })    
        })
        .catch(error => alert(error));
    //PUPPY FAIL
    const urlPuppyFail = 'http://api.giphy.com/v1/gifs/search?q=puppy+fail&api_key='+API_KEY+'&limit=50000';
    fetch(urlPuppyFail)
        .then(response => {return response.json()})
        .then(response => {
            let newResp = response.data;

            newResp.forEach(gif => {
              gifs.push({
                id: gif.id, 
                url: gif.images.fixed_width.url
              })
            })    
        })
        .catch(error => alert(error));
    //DOG FAIL
    const urlDogFail = 'http://api.giphy.com/v1/gifs/search?q=dog+fail&api_key='+API_KEY+'&limit=50000';
    fetch(urlDogFail)
        .then(response => {return response.json()})
        .then(response => {
            let newResp = response.data;

            newResp.forEach(gif => {
              gifs.push({
                id: gif.id, 
                url: gif.images.fixed_width.url
              })
            })    
        })
        .catch(error => alert(error));

    //Funny puppy
    const urlFunnyPuppy = 'http://api.giphy.com/v1/gifs/search?q=funny+puppy&api_key='+API_KEY+'&limit=50000';
    fetch(urlFunnyPuppy)
        .then(response => {return response.json()})
        .then(response => {
            let newResp = response.data;

            newResp.forEach(gif => {
              gifs.push({
                id: gif.id, 
                url: gif.images.fixed_width.url 
              })
            })    
            const uniqueGifs = this.UniqueValuesArray(gifs, 'id');
            const ShuffledGifs = uniqueGifs.sort(() => {return 0.5 - Math.random()});
            this.setState({gifsObjects: ShuffledGifs, loading: false});
        })
        .catch(error => alert(error));
    
  }  

  renderItem = ({item}) => (
       <PuppyCard id={item.id} url={item.url} />
  )

  handleScroll = (e, userId =this.state.userId, initialNumber = this.state.initialNumber) => {
    this.scroll.scrollTo({x: 0, y: e.nativeEvent.contentOffset.y / 10, animated:true})//bg image

    if(e.nativeEvent.contentOffset.y > 268){   
            firebase.database().ref('users/'+userId).update({
              numberGifs: Math.floor((e.nativeEvent.contentOffset.y - 268) / 410) + 2 + initialNumber
            })
    }
    else if(e.nativeEvent.contentOffset.y < 0 && e.nativeEvent.contentOffset.y >= -100){
           console.log('dh')
    }
    else if(e.nativeEvent.contentOffset.y < -100){
          this.setState({ loading:true })
          this.fetchGifs(); 
    }
  }

  UniqueValuesArray(arr, prop){
    var obj = {};
      for ( var i = 0, len = arr.length; i < len; i++ ){
        if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
      }
      var newArr = [];
        for ( var key in obj ) 
          newArr.push(obj[key]);
      return newArr;
  }

  ListHeader = () => {
    return{
        color:this.state.colorTop.interpolate({
              inputRange: [0,0.2,0.4,0.6,0.8,1],
              outputRange: ['#fff',"#9740FA", "#FB6769", '#2AFC9C', '#FFF39F', '#22CDFB']
        }),
        fontSize:24,
        width:'100%',
        textAlign:'center',
        padding:16, 
        fontFamily:'natureBeauty',
        backgroundColor: '#000',
        position:'absolute',
        top:0,
        zIndex:5
        }
  }

  render() {
    const { gifsObjects, loading } = this.state;
    let HeaderColor = this.state.colorTop.interpolate({
      inputRange: [0,1],
      outputRange: ['#fff', "#ff0000"]
    })
    if(loading){
      return(<View style={styles.containerWhite}>
                <Image source={require('../assets/loader.gif')} style={{width:'100%', height:'100%'}} />}
             </View>
      )
    }
    
    return (
      <View style={styles.container}>

            <Animated.Text style={this.ListHeader()}>Puppies Just  For  You !</Animated.Text>

            <View style={{width:'100%', height:'100%', zIndex:4, position:'absolute', top:60}}>
                <ScrollView
                    contentContainerStyle={{alignItems:'center'}}
                    ref={y => {this.scroll = y}}
                    >
                    <Image source={require('../assets/dogs.png')} style={{height: 30000, width:380, resizeMode:'cover'}} />
                </ScrollView>

            </View>
            <View style={{width:'100%', height:'100%', zIndex:8, position:'absolute', top:60, alignItems:'center'}}>
              <FlatList 
                  data={gifsObjects}
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
    justifyContent: 'center', 
  },
  containerWhite: {
    flex: 1,
    backgroundColor: '#fff',
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
