import React, { Component } from 'react';

import { List } from 'react-native-elements';

import ServiceCard from '../Components/ServiceCard';


export default class extends Component {
  createServiceCard(type, title, time, price) {
    return (
      <ServiceCard
        type = { type }
        title = { title }
        time = { time }
        price = { price }
      />
    );
  }

  render() {
    return (
      <List>
        {
          [1, 2].map(() => {
            return this.createServiceCard('', 'Premium', '30', '999.99');
          })
        }
      </List>
    );
  }
}