import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ResidentContainer from './ResidentContainer';
import BusinessContainer from './BusinessContainer';
import MoreContainer from './MoreContainer';
import eGobie from '../Styles/Egobie';


const routes = {
  // Resident: {
  //   screen: ResidentContainer,
  // },
  Business: {
    screen: BusinessContainer,
  },
  More: {
    screen: MoreContainer,
  },
};

const configs = {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    style: {
      borderTopWidth: 0.5,
      backgroundColor: eGobie.EGOBIE_WHITE,
    },
    labelStyle: {
      fontSize: 10,
    },
    activeTintColor: eGobie.EGOBIE_BLUE,
    inactiveTintColor: eGobie.EGOBIE_BLACK,
  },
};

export default StackNavigator({
  Home: {
    screen: TabNavigator(routes, configs),
  },
});
