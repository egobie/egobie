import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ServiceCard from '../Components/ServiceCard';


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

  render() {
    return (
      <ScrollView style = { [this.props.style && this.props.style] }>
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
 