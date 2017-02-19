import React, { Component } from 'react';
import { View, Text } from 'react-native';

import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import Service from './ServiceScreen';
import Steps from '../Components/Steps';


export default class extends Component {
  constructor() {
    super();
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

  _selectService() {
    this.props.navigation.navigate('Order');
  }

  render() {
    return (
      <View style = {{
        flex: 1,
      }}>
        <Steps style = {{
          borderWidth: 1,
          borderColor: 'red',
        }}/>
        <Service
          style = {{
            flex: 1,
            borderWidth: 1,
            paddingTop: 0,
          }}
          onServiceSelect = { this.selectService }
        />
      </View>
    );
  }
}