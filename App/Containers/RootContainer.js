import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ResidentContainer from './ResidentContainer';
import BusinessContainer from './BusinessContainer';
import MoreContainer from './MoreContainer';
import UserScreen from '../Screens/UserScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import VehicleScreen from '../Screens/VehicleScreen';
import AboutScreen from '../Screens/AboutScreen';
import eGobie from '../Styles/Egobie';


const routes = {
  Resident: {
    screen: ResidentContainer,
  },
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

const stackRouteConfigs = {
  navigationOptions: {
    header: null,
  },
};

export default StackNavigator({
  // Home: {
  //   screen: TabNavigator(routes, configs),
  // },
  Resident: {
    screen: ResidentContainer,
    ...stackRouteConfigs,
  },
  User: {
    screen: UserScreen,
  },
  Vehicles: {
    screen: VehicleScreen,
  },
  Payments: {
    screen: PaymentScreen,
  },
  About: {
    screen: AboutScreen,
  }
}, {
  headerMode: 'screen',
});
