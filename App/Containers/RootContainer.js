import React, { Component } from 'react'
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';
import ResidentContainer from './ResidentContainer';
import UserScreen from '../Screens/UserScreen';
import VehicleScreen from '../Screens/VehicleScreen';
import AboutScreen from '../Screens/AboutScreen';
import VehicleModal from '../Modals/VehicleModal';
import SignModal from '../Modals/SignModal';
import CalendarModal from '../Modals/CalendarModal';
import PickerModal from '../Modals/PickerModal';
import ServiceDetailModal from '../Modals/ServiceDetailModal'
import ResetPasswordModal from '../Modals/ResetPasswordModal';
import eGobie from '../Styles/Egobie';


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

const Navigator = StackNavigator({
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
  About: {
    screen: AboutScreen,
  }
}, {
  headerMode: 'screen',
});

export default React.createClass({
  render: () => {
    return (
      <View style = {{
        flex: 1,
      }}>
        <Navigator { ...this.props } />
        <VehicleModal />
        <CalendarModal />
        <SignModal />
        <ResetPasswordModal />
        <Loading />
        <PickerModal />
        <ServiceDetailModal />
        <ErrorMessage />
      </View>
    );
  }
});