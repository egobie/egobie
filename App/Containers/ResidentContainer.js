import React, { Component } from 'react';
import { View, Text, Animated, ScrollView, Dimensions } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import Steps from '../Components/Steps';
import Loading from '../Components/Loading';
import ScannerScreen from '../Screens/ScannerScreen';
import MapScreen from '../Screens/MapScreen';
import ServiceScreen from '../Screens/ServiceScreen';
import OrderScreen from '../Screens/OrderScreen';
import SignModal from '../Modals/SignModal';
import CalendarModal from '../Modals/CalendarModal';
import PaymentModal from '../Modals/PaymentModal';
import VehicleModal from '../Modals/VehicleModal';
import PickerModal from '../Modals/PickerModal';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


export default class extends Component {
  service;
  order;
  view;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {{ flex: 1 }}>
        <MapScreen />
        <OrderScreen />
        <ServiceScreen />
        <CalendarModal />
        <SignModal />
        <PaymentModal />
        <VehicleModal />
        <ScannerScreen />
        <Loading />
        <PickerModal />
        {
        // <ScrollView
        //   ref = { (sv) => { this.view = sv; } }
        //   horizontal = { true }
        //   pagingEnabled = { true }
        //   showsHorizontalScrollIndicator = { false }
        //   scrollEnabled = { false }
        // >
        //   <View style = {{
        //     flex: 1,
        //     width: Dimension.width,
        //   }}>
            
        //   </View>
        //   <OrderScreen
        //     ref = { (o) => { this.order = o; } }
        //     onBack = { this.goBack }
        //   />
        //   <SignModal ref = { 'sign' }/>
        //   <CalendarModal ref = { 'calendar' }/>
        // </ScrollView>
        }
      </View>
    );
  }
}