import * as React from 'react';
import { Animated, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red'
    
  },
  splash: {
    width: 380,
    height: 670,
    resizeMode: 'cover'  
  }
});

export default class SplashScreen extends React.Component {

    constructor(props){
      super(props);
      this.state ={
        fade: new Animated.Value(0)
      }
    }

    componentDidMount(){
      Animated.sequence([

        Animated.timing(this.state.fade, {
        toValue: 1,
        duration:500
      }),

      Animated.timing(this.state.fade, {
        toValue: 0,
        duration:500,
        delay:2000
      })

      ]).start();
         
    }

    render(){
      const { fade } = this.state;
      return (
        <Animated.View style={{...styles.container, opacity: fade}}>
          <Image style={styles.splash} source={require("../assets/splash.png")}/>
        </Animated.View>
    );
    }
    
}
