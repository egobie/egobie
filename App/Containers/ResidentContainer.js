import React, { Component } from 'react';
import { View, Text, Animated, ScrollView, Dimensions } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import Steps from '../Components/Steps';
import MapScreen from '../Screens/MapScreen';
import ServiceScreen from '../Screens/ServiceScreen';
import OrderScreen from '../Screens/OrderScreen';
import SignModal from '../Modals/SignModal';
import CalendarModal from '../Modals/CalendarModal';
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
        <MapScreen
          selectPlace = { () => {} }
        />
        <ServiceScreen
          ref = { (s) => { this.service = s; } }
          services = { [] }
          onServicePress = { () => {} }
          onServiceLongPress = { () => {} }
        />
        <OrderScreen
          ref = { (o) => { this.order = o; } }
        />
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