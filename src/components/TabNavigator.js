import { createMaterialTopTabNavigator } from 'react-navigation';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import Discover from '../screens/Discover';
import Profile  from '../screens/Profile';
import Favorite  from '../screens/Favorite';

const AppTabNavigator = createMaterialTopTabNavigator({
  Discover: {
    screen: Discover, 
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: Profile, 
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="user" color={tintColor} size={24} />
      )
    }
  },
  Favorite: {
    screen: Favorite, 
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="heart" color={tintColor} size={24} />
      ),
    }
  }
}, {
  initialRouteName: 'Discover',
  order:['Favorite', 'Discover', 'Profile'],
  tabBarPosition:'bottom',
  shifting: true,
  tabBarOptions: {
    activeTintColor: '#9CFFE4',
    InactiveTintColor: '#fff',
    style: {
      backgroundColor: '#000',
      borderTopColor: 'grey',
      borderTopWidth: 1,
      height:50
    },
    indicatorStyle:{
      height:2,
      backgroundColor: "#9CFFE4" 
    },
    showIcon:true,
    showLabel:false
  }
  
});

export default AppTabNavigator;