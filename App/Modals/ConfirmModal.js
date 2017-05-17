import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';

import * as ConfirmAction from '../Actions/';
import Modal from '../Components/Modal';
import Dimension from '../Libs/Dimension';
import BoxShadow from '../Styles/BoxShadow';
import eGobie from '../Styles/Egobie';


class ConfirmModal extends Component {
  state = {
    visible: false,
    message: null,
    okProps: null,
    cancelProps: null,
  };

  constructor(props) {
    super(props);
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
              {
                this.state.okProps && <Button
                  title = { this.state.okProps.title }
                  backgroundColor = { this.state.okProps.backgroundColor }
                  onPress = { this.state.okProps.callBack }
                  buttonStyle = {{
                    width: 90,
                    ...BoxShadow,
                  }}
                />
              }
              {
                this.state.cancelProps && <Button
                  title = { this.state.cancelProps.title }
                  backgroundColor = { this.state.cancelProps.backgroundColor }
                  onPress = { this.state.cancelProps.callBack }
                  buttonStyle = {{
                    width: 90,
                    ...BoxShadow,
                  }}
                />
              }
            </View>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visible: state.confirm.visible,
    from: state.confirm.from,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeChoice: (type, from) => {
      dispatch({
        type, from,
      });
    },
  };
};


export default connect()(ConfirmModal);