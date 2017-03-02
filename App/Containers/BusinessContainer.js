import React, { Component } from 'react';
import { View, Text } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class extends Component {
  state = {
    value: '',
    type: '',
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

  onSelect(type, value) {
    this.setState({
      value: value,
      type: type,
    });
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