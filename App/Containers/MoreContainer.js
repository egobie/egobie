import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import MenuScreen from '../Screens/MenuScreen';


export default class extends Component {
  static navigationOptions = {
    tabBar: {
      label: I18n.t('tab.more'),
      icon: ({ tintColor }) => {
        return (
          <Icon name = 'user' size = {23} color = { tintColor } />
        );
      },
    }
  };

  render() {
    return (
      <MenuScreen { ...this.props } />
    );
  }
};