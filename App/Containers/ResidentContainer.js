import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import Steps from '../Components/Steps';
import ServiceScreen from '../Screens/ServiceScreen';
import PaymentScreen from '../Screens/PaymentScreen'
import OrderScreen from '../Screens/OrderScreen';


export default class extends Component {
  constructor(props) {
    super(props);
    this.goBack = this._goBack.bind(this);
    this.selectService = this._selectService.bind(this);
  }

  static navigationOptions = {
    title: 'Resident',
    header: {
      titleStyle: {
        
      }
    },
    tabBar: {
      label: I18n.t('tab.resident'),
      icon: ({ tintColor }) => {
        return (
          <Icon name = 'home' size = { 25 } color = { tintColor } />
        );
      },
    }
  };

  service;
  order;
  view;

  _selectService() {
    // this.scrollBy(1);
    this.service.hide();
    this.order.show();
  }

  _goBack() {
    this.order.hide();
    this.service.show();
  }

  render() {
    return (
      <View style = {{ flex: 1 }}>
        <Steps />
        <ScrollView
          ref = { (sv) => { this.view = sv; } }
          horizontal = { true }
          pagingEnabled = { true }
          showsHorizontalScrollIndicator = { false }
          scrollEnabled = { false }
        >
          <PaymentScreen />
          <ServiceScreen
            ref = { (s) => { this.service = s; } }
            services = { [] }
            onServiceSelect = { this.selectService }
          />
          <OrderScreen
            ref = { (o) => { this.order = o; } }
            onBack = { this.goBack }
          />
        </ScrollView>
      </View>
    );
  }
}