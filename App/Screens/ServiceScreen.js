import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

import { Icon } from 'react-native-elements';

import Service from '../Components/Service';
import Dimension from '../Libs/Dimension';

class ServiceScreen extends Component {
  constructor(props) {
    super(props);
  }

  services = [];

  hide() {
    this.services.forEach((service) => {
      service.hide();
    });
  }

  show() {
    this.services.forEach((service) => {
      service.show();
    });
  }

  render() {
    return (
      <View style = {{
        flex: 1,
        width: Dimension.width,
      }}>
        <View style = {{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
        }}>
          <Text style = {{
            flex: 1,
            fontSize: 15,
            paddingLeft: 15,
          }}> eGobie Services </Text>
          <Icon
            type = { 'material-community' }
            name = { 'chevron-up' }
            iconStyle = {{
              marginRight: 20,
            }}
          />
        </View>
        <ScrollView>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) => {
            return (
              <Service
                ref = { (service) => { this.services.push(service) } }
                id = { 1 }
                type = ''
                title = 'Premium'
                time = '30'
                price = '999.99'
                key = { key }
                onClick = { this.props.onServiceSelect }
                delay = { key * 50 }
              />
            );
          })
        }
        </ScrollView>
      </View>
    );
  }
}

ServiceScreen.propTypes = {
  services: React.PropTypes.array.isRequired,
  onServiceSelect: React.PropTypes.func.isRequired,
};

 export default ServiceScreen;
 