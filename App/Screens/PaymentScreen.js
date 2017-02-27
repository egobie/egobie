import React, { Component } from 'react';
import { View, Animated, Modal, Easing } from 'react-native';

import { CreditCardInput } from 'react-native-credit-card-input';
import { Button, Icon } from 'react-native-elements';

import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class PaymentScreen extends Component {
  state = {
    visibile: false,
  };

  animation = {
    cardScale: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.cardInput = this._cardInput.bind(this);
    this.show = this._show.bind(this);
    this.hide = this._hide.bind(this);
  }

  _cardInput(card) {

  }

  _show() {
    this.setState({ visibile: true });
    setTimeout(() => {
      Animated.spring(this.animation.cardScale, {
        toValue: 0.85,
        friction: 4,
        tension: 40,
      }).start();
    }, 200);
  }

  _hide() {
    Animated.timing(this.animation.cardScale, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this._resetState();
    });
  }

  _resetState() {
    this.setState({
      visibile: false,
    });
  }

  render() {
    return (
      <Modal
        transparent
        visible = { this.state.visibile }
      >
        <View style = {{
          flex: 1,
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          <Animated.View style = {{
            flex: 1,
            height: 400,
            flexDirection: 'column',
            justifyContent: 'center',
            width: Dimension.width,
            backgroundColor: eGobie.EGOBIE_SHADOW,
            transform: [
              { scale: this.animation.cardScale },
            ],
          }}>
            <View style = {{
              height: 30,
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              <Icon
                onPress = { this.hide }
                type = { 'material-community' }
                name = { 'close' }
                iconStyle = {{
                  color: eGobie.EGOBIE_RED,
                  marginTop: 20,
                  marginRight: 20,
                }}
              />
            </View>
            <View style = {{
              height: 350,
              justifyContent: 'center',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              <CreditCardInput
                requiresName
                cardScale = { 0.9 }
                invalidColor = { eGobie.EGOBIE_RED }
                placeholderColor = { eGobie.EGOBIE_GREY }
                labelStyle = {{
                  fontWeight: '500',
                  fontSize: 12,
                }}
                inputContainerStyle = {{
                  borderBottomWidth: 1,
                  borderBottomColor: eGobie.EGOBIE_GREY,
                }}
                inputStyle = {{
                  lineHeight: 30,
                  fontSize: 14,
                }}
                onChange = { this.cardInput }
              />
            </View>
            <View style = {{
              height: 100,
              justifyContent: 'flex-start',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              <Button
                title = 'ADD CARD'
                backgroundColor = { eGobie.EGOBIE_BLUE }
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default PaymentScreen;
