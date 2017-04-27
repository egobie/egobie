import React, { Component } from 'react';
import { View, ScrollView, Animated, Modal, Easing } from 'react-native';
import { connect } from 'react-redux';

import { Button, Icon, CheckBox } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class PaymentModal extends Component {
  state = {
    visibile: false,
    selected: null,
    pickerScale: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({ visibile: true });
    setTimeout(() => {
      Animated.spring(this.state.pickerScale, {
        toValue: 0.85,
        friction: 4,
        tension: 40,
      }).start();
    }, 200);
  }

  hide = () => {
    Animated.timing(this.state.pickerScale, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.props.hidePicker();
      this.resetState();
    });
  }

  scrollList = () => {
    return this.state.options.map((option, i) => {
      return (
        <CheckBox
          center
          title = { option.label }
          checked = { option.key === this.state.selected }
        />
      );
    });
  }

  resetState = () => {
    this.setState({
      visibile: false,
      selected: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case Action.WORK_FLOW_PICKER_MAKE:
      case Action.WORK_FLOW_PICKER_MODEL:
      case Action.WORK_FLOW_PICKER_STATE:
      case Action.WORK_FLOW_PICKER_YEAR:
        this.show();
        break;
    }
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
              { scale: this.state.pickerScale },
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
            <ScrollView style = {{
              height: 350,
              justifyContent: 'center',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              { this.scrollList() }
            </ScrollView>
            <View style = {{
              height: 100,
              justifyContent: 'flex-start',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              <Button
                title = 'CONFIRM'
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
    hidePicker: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

