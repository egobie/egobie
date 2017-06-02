import React, { Component } from 'react';
import { View, Image, Text, Platform } from 'react-native';

import creditCardBgs from '../Libs/CreditCardBg';
import creditCardIcons from '../Libs/CreditCardIcon';


class CreditCard extends Component {
  fontFamily = Platform.select({
    ios: 'Courier',
    android: 'monospace'
  });

  constructor(props) {
    super(props);
    this.brand = this.props.type ? this.props.type : 'placeholder';
  }

  icon() {
    return (
      <Image
        source = { creditCardIcons[this.brand] }
        style = {{
          position: 'absolute',
          resizeMode: 'contain',
          top: 15,
          right: 15,
          width: 60,
          height: 40,
        }}
      />
    );
  }

  number() {
    return (
      <Text style = {{
        position: 'absolute',
        fontSize: 21,
        fontFamily: this.fontFamily,
        top: 95,
        left: 28,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.8)',
      }}>
        { `•••• •••• •••• ${this.props.number}` }
      </Text>
    );
  }

  name() {
    return (
      <Text style = {{
        position: "absolute",
        bottom: 20,
        left: 25,
        right: 100,
        fontSize: 16,
        fontFamily: this.fontFamily,
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
      }}>
        { this.props.name.toUpperCase() }
      </Text>
    );
  }

  expiryLabel() {
    return (
      <Text style = {{
        position: 'absolute',
        bottom: 40,
        left: 218,
        fontSize: 9,
        fontFamily: this.fontFamily,
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
      }}>
        MONTH/YEAR
      </Text>
    );
  }

  expiryValue() {
    return (
      <Text style = {{
        position: 'absolute',
        bottom: 20,
        left: 220,
        fontSize: 16,
        fontFamily: this.fontFamily,
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
      }}>
        { this.props.expiry }
      </Text>
    );
  }

  render() {
    return (
      <View style = {[this.props.containerStyle && this.props.containerStyle, {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }]}>
        <Image
          source = { creditCardBgs[this.brand] }
          style = {[ this.props.cardStyle && this.props.cardStyle, {
            width: 300,
            height: 190,
            transform: [{
              scale: this.props.cardScale ? this.props.cardScale : 1,
            }],
          } ]}
        >
          { this.icon() }
          { this.number() }
          { this.name() }
          { this.expiryLabel() }
          { this.expiryValue() }
        </Image>
      </View>
    );
  }

};

CreditCard.propTypes = {
  number: React.PropTypes.string.isRequired,
  expiry: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  cardScale: React.PropTypes.number,
  containerStyle: React.PropTypes.object,
};

export default CreditCard;
