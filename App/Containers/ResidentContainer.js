import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import Steps from '../Components/Steps';
import ServiceScreen from '../Screens/ServiceScreen';
import OrderScreen from '../Screens/OrderScreen';


export default class extends Component {
  constructor(props) {
    super(props);
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
  x = 0;

  _selectService() {
    // this.scrollBy(1);
    this.service.hide();
    this.order.show();
  }

  scrollBy(page) {
    this.x = this.x + page * width;
    this.view.scrollTo({
      x: this.x,
      y: 0,
      animated: true,
    });
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
          <ServiceScreen
            ref = { (s) => { this.service = s; } }
            onServiceSelect = { this.selectService }
          />
          <OrderScreen ref = { (o) => { this.order = o; } }/>
        </ScrollView>
      </View>
    );
  }
}