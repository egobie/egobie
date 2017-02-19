import React, { Component } from 'react'

// Keep before all containers and components
import '../I18n/I18n';
import { TabNavigator } from 'react-navigation';


// export default class App extends Component {
//   render() {
//     return (
//       <SideMenuContainer />
//     );
//   }
// }
import ResidentContainer from './ResidentScreen';
import BusinessContainer from './BusinessScreen';
import MoreContainer from './MoreScreen';


export default TabNavigator({
  Resident: {
    screen: ResidentContainer,
  },
  Business: {
    screen: BusinessContainer,
  },
  More: {
    screen: MoreContainer,
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    style: {
      borderTopWidth: 0.5,
      backgroundColor: '#F6F6F6',
    },
    labelStyle: {
      fontSize: 10,
    },
    activeTintColor: '#3FA6D1',
    inactiveTintColor: '#484E56', // #ABB8C7
  },
});