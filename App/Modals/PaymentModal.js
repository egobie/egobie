import React, { Component } from 'react';
import { View, Animated, Modal, Easing } from 'react-native';
import { connect } from 'react-redux';

import { CreditCardInput } from 'react-native-credit-card-input';
import { Button, Icon } from 'react-native-elements';

import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class PaymentModal extends Component {
  state = {
    visibile: false,
    cardScale: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  cardInput = (card) => {

  }

  show = () => {
    this.setState({ visibile: true });
    setTimeout(() => {
      Animated.spring(this.state.cardScale, {
        toValue: 0.85,
        friction: 4,
        tension: 40,
      }).start();
    }, 200);
  }

  hide = () => {
    Animated.timing(this.state.cardScale, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.resetState();
    });
  }

  resetState = () => {
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
              { scale: this.state.cardScale },
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
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

