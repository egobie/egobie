import React, { Component } from 'react';
import { View, Text, Animated, ScrollView, Dimensions } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mask from '../Components/Mask';
// import ScannerScreen from '../Screens/ScannerScreen';
import MapScreen from '../Screens/MapScreen';
import ServiceScreen from '../Screens/ServiceScreen';
import OrderScreen from '../Screens/OrderScreen';
import MenuScreen from '../Screens/MenuScreen';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {{ flex: 1 }}>
        <MapScreen />
        <OrderScreen { ...this.props } />
        <ServiceScreen />
        <Mask />
        <MenuScreen { ...this.props } />
        { /* <ScannerScreen /> */ }
      </View>
    );
  }
}