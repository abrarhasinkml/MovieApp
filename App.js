import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Screens/Home.js';
import Detail from './Screens/Detail.js';

const app=createStackNavigator({
  Home:{screen:Home},
  Detail:{screen:Detail}
});

export default createAppContainer(app);