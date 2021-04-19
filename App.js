import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Screens/Home.js';
import Detail from './Screens/Detail.js';

const app=createStackNavigator({
  Home:{screen:Home, navigationOptions:{header:null}},
  Detail:{screen:Detail, navigationOptions:{headerStyle:{
    backgroundColor:"#2a9d8f",
    borderBottomColor:"#000000"
  }}}
});

export default createAppContainer(app);