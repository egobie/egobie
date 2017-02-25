import React, { Component } from 'react';
import { Animated } from 'react-native';

import { CreditCardInput } from 'react-native-credit-card-input';

import Dimension from '../Libs/Dimension';


class PaymentScreen extends Component {
  state = {
    scale: new Animated.Value(1),
  };

  constructor(props) {
    super(props);
    this.cardInput = this._cardInput.bind(this);
  }

  _cardInput(card) {

  }

  render() {
    return (
      <Animated.View style = {{
        flex: 1,
        width: Dimension.width,
        transform: [
          { scale: this.state.scale },
        ],
      }}>
        <CreditCardInput
          cardScale = { 0.9 }
          labelStyle = {{
            fontWeight: '500',
            fontSize: 12,
          }}
          inputContainerStyle = {{
            borderBottomWidth: 1,
            borderBottomColor: '#ABB8C7',
          }}
          inputStyle = {{
            lineHeight: 30,
            fontSize: 14,
          }}
          onChange = { this.cardInput }/>
      </Animated.View>
    );
  }
}

export default PaymentScreen;
