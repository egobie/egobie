import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native';

import MapScreen from '../Screens/MapScreen';
import ServiceScreen from '../Screens/ServiceScreen';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


export default class extends Component {
  state = {
    value: '',
    type: '',
    data: '',
    dataDetails: '',
  };

  static navigationOptions = {
    tabBar: {
      label: I18n.t('tab.business'),
      icon: ({ tintColor }) => {
        return (
          <Icon name = 'building' size = { 20 } color = { tintColor } />
        );
      },
    }
  };

  selectPlace(place) {
    Reactotron.log(place);
  }

  render() {
    return (
      <View style = {{
        flex: 1,
      }}>
      </View>
    );
  }
}