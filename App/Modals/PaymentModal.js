import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import { CreditCardInput } from 'react-native-credit-card-input';
import { Button, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Modal from '../Components/Modal';
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
    Animated.spring(this.state.cardScale, {
      toValue: 0.85,
      friction: 5,
      tension: 40,
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.cardScale, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.props.hidePayment();
      this.resetState();
    });
  }

  resetState = () => {
    this.setState({
      visibile: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_PAYMENT:
        this.show();
        break;
    }
  }

  render() {
    return (
      <Modal visible = { this.state.visibile } >
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
              { this.state.visibile && <CreditCardInput
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
              /> }
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
  return {
    workflow: state.workflow.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidePayment: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

