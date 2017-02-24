import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';

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
      <ScrollView style = {{
        flex: 1,
        width: Dimension.width,
      }}>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) => {
          return (
            <Service
              ref = { (service) => { this.services.push(service); } }
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
    );
  }
}

ServiceScreen.propTypes = {
  services: React.PropTypes.array.isRequired,
  onServiceSelect: React.PropTypes.func.isRequired,
};

 export default ServiceScreen;
 