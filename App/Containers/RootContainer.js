import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ResidentContainer from './ResidentContainer';
import BusinessContainer from './BusinessContainer';
import MoreContainer from './MoreContainer';

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
      backgroundColor: '#F6F6F6',
    },
    labelStyle: {
      fontSize: 10,
    },
    activeTintColor: '#3FA6D1',
    inactiveTintColor: '#484E56', // #ABB8C7
  },
};

export default StackNavigator({
  Home: {
    screen: TabNavigator(routes, configs),
  },
});
