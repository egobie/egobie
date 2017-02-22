import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';

import ServiceCard from '../Components/ServiceCard';
import Dimension from '../Libs/Dimension';

class ServiceScreen extends Component {
  constructor(props) {
    super(props);
  }

  serviceCards = [];

  hide() {
    this.serviceCards.forEach((sc) => {
      sc.hide();
    });
  }

  show() {
    this.serviceCards.forEach((sc) => {
      sc.show();
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
            <ServiceCard
              ref = { (sc) => { this.serviceCards.push(sc); } }
              type = ''
              title = 'Premium'
              time = '30'
              price = '999.99'
              key = { key }
              onPress = { this.props.onServiceSelect }
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
  onServiceSelect: React.PropTypes.func.isRequired,
}

 export default ServiceScreen;
 