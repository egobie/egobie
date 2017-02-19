import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ServiceCard from '../Components/ServiceCard';


class ServiceScreen extends Component {
  constructor() {
    super();
  }

  createServiceCard(type, title, time, price, key) {
    return (
      <ServiceCard
        type = { type }
        title = { title }
        time = { time }
        price = { price }
        key = { key }
        onPress = { this.props.onServiceSelect }
      />
    );
  }

  render() {
    return (
      <ScrollView style = { [this.props.style && this.props.style] }>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) => {
          return this.createServiceCard('', 'Premium', '30', '999.99', key);
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
 