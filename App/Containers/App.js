import React, { Component } from 'react'

// Import `I18n` before all other containers and components
import '../I18n/I18n';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ResidentContainer from './ResidentContainer';
import BusinessContainer from './BusinessContainer';
import MoreContainer from './MoreContainer';


const MainNavigator = TabNavigator({
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

const AppNavigator = StackNavigator({
  Home: {
    screen: MainNavigator,
  },
});

export default AppNavigator;
