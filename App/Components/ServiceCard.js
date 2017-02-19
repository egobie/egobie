import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ListItem } from 'react-native-elements';

class ServiceCard extends Component {
  serviceIcon(type) {
    return {
      type: 'material-community',
      name: type === 'car-wash' ? 'car-wash' : 'oil',
      style: {
        color: 'red',
        fontSize: 35,
      }
    };
  }

  render() {
    return (
      <ListItem
        hideChevron
        onPress = { () => { this.props.onPress(this.props.title) } }
        title = { this.props.title }
        titleStyle = {{
          color: '#484E56',
          fontWeight: '600',
        }}
        subtitle = { `Estimated Time: ${this.props.time}min` }
        subtitleStyle = {{
          color: '#484E56',
          fontWeight: '300',
        }}
        rightTitle = { `$${this.props.price}` }
        rightTitleStyle = {{
          color: '#484E56',
          fontWeight: '700',
        }}
        leftIcon = { this.serviceIcon(this.props.type) }
        containerStyle = {{
          height: 75,
          justifyContent: 'center',
        }}
      />
    );
  }
}

ServiceCard.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
  price: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
};

export default ServiceCard;
