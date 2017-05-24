import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';

import Modal from '../Components/Modal';
import Dimension from '../Libs/Dimension';
import BoxShadow from '../Styles/BoxShadow';
import eGobie from '../Styles/Egobie';


export default class ConfirmModal extends Component {
  state = {
    visible: false,
    message: null,
    confirmCallback: null,
    cancelCallback: null,
  };

  constructor(props) {
    super(props);
  }

  show = (message, confirmCallback, cancelCallback) => {
    this.setState({
      visible: true,
      message, confirmCallback, cancelCallback,
    });
  }

  confirm = () => {
    if (this.state.confirmCallback) {
      this.state.confirmCallback();
    }
    this.resetState();
  }

  cancel = () => {
    if (this.state.cancelCallback) {
      this.state.cancelCallback();
    }
    this.resetState();
  }

  resetState = () => {
    this.setState({
      visible: false,
      message: null,
      confirmCallback: null,
      cancelCallback: null,
    });
  }

  render() {
    return (
      <Modal
        visible = { this.state.visible }
        animated = { true }
      >
        <Animated.View style = {{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          <View style = {{
            width: Dimension.width * 0.8,
            height: 150,
            paddingLeft: 8,
            paddingRight: 8,
            backgroundColor: eGobie.EGOBIE_WHITE,
            ...BoxShadow
          }}>
            <View style = {{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style = {{
                textAlign: 'center',
              }}>{ this.state.message }</Text>
            </View>
            <View style = {{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Button
                title = { 'Confirm' }
                backgroundColor = { eGobie.EGOBIE_RED }
                onPress = { this.confirm }
                buttonStyle = {{
                  width: 90,
                  ...BoxShadow,
                }}
              />
              <Button
                title = { 'Cancel' }
                backgroundColor = { eGobie.EGOBIE_BLUE }
                onPress = { this.cancel }
                buttonStyle = {{
                  width: 90,
                  ...BoxShadow,
                }}
              />
            </View>
          </View>
        </Animated.View>
      </Modal>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }
}