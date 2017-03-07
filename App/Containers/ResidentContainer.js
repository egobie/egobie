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
    // this.refs.calendar.show();
    // this.refs.sign.show();
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
        <ScrollView
          ref = { (sv) => { this.view = sv; } }
          horizontal = { true }
          pagingEnabled = { true }
          showsHorizontalScrollIndicator = { false }
          scrollEnabled = { false }
        >
          <View style = {{
            flex: 1,
            width: Dimension.width,
          }}>
            <MapScreen />
            <Animated.View style = {{
              position: 'absolute',
              backgroundColor: eGobie.EGOBIE_WHITE,
              top: Dimension.height * 0.5,
              transform: [
                { scale: 0.80 },
              ],
            }}>
              <ServiceScreen
                ref = { (s) => { this.service = s; } }
                services = { [] }
                onServiceSelect = { this.selectService }
              />
            </Animated.View>
          </View>
          <OrderScreen
            ref = { (o) => { this.order = o; } }
            onBack = { this.goBack }
          />
          <SignModal ref = { 'sign' }/>
          <CalendarModal ref = { 'calendar' }/>
        </ScrollView>
      </View>
    );
  }
}