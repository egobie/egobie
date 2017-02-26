import React, { Component } from 'react';
import { View, Text } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import SignScreen from '../Screens/SignScreen';


export default class extends Component {
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

  render() {
    return (
      <View style = {{
        flex: 1,
      }}>
        <SignScreen />
      </View>
    );
  }
}