import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import { Kaede } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Modal from '../Components/Modal';
import Dimension from '../Libs/Dimension';
import States from '../Libs/States';
import Colors from '../Libs/Colors';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


const inputDefaultProps = {
  labelStyle: {
    fontSize: 16,
    marginLeft: 30,
    fontWeight: '500',
    color: eGobie.EGOBIE_WHITE,
    backgroundColor: eGobie.EGOBIE_BLUE,
    transform: [
      { scaleY: 0.9 },
    ],
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: '400',
    paddingTop: 0,
    paddingBottom: 0,
    height: 40,
    lineHeight: 40,
    color: eGobie.EGOBIE_BLACK,
  },
  style: {
    marginBottom: 10,
    backgroundColor: eGobie.EGOBIE_WHITE,
  },
  height: 40,
};

const buttonStyle = {
  height: 40,
  width: Dimension.width * 0.9,
  marginBottom: 10,
  marginLeft: 0,
  backgroundColor: eGobie.EGOBIE_BLUE,
  justifyContent: 'flex-start',
  paddingLeft: 0,
};

const buttonTextStyle = {
  fontSize: 16,
  marginLeft: 30,
};

class VehicleModal extends Component {
  state = {
    visibile: false,
    cardScale: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({ visibile: true });
    Animated.spring(this.state.cardScale, {
      toValue: 0.85,
      friction: 4,
      tension: 40,
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.cardScale, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.resetState();
      this.props.hideVehicle();
    });
  }

  resetState() {
    this.setState({
      visibile: false,
    });
  }

  getYears() {
    let year = new Date().getFullYear() + 1;
    let years = [];
    let limit = 1980;

    for (let i = year; i >= limit; i--) {
      years.push(i);
    }

    return years.map((y) => {
      return { key: `${y}`, label: `${y}` };
    });
  }

  vehicleForm() {
    return (
      <View style = {{
        height: 350,
        paddingTop: 25,
        paddingLeft: 15,
        paddingRight: 15,
        overflow: 'hidden',
        justifyContent: 'flex-start',
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <Kaede
          label = { 'PLATE' }
          { ...inputDefaultProps }
        />
        <Button
          title = 'MAKE'
          onPress = { () => { this.props.showPicker(WorkflowAction.WORK_FLOW_PICKER_MAKE) } }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = 'MODEL'
          onPress = { () => { this.props.showPicker(WorkflowAction.WORK_FLOW_PICKER_MODEL) } }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = 'STATE'
          onPress = { () => { this.props.showPicker(WorkflowAction.WORK_FLOW_PICKER_STATE) } }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = 'YEAR'
          onPress = { () => { this.props.showPicker(WorkflowAction.WORK_FLOW_PICKER_YEAR) } }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
      </View>
    );
  }

  saveVehicle() {
    
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_VEHICLE:
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
            height: 450,
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
                  marginRight: 15,
                }}
              />
            </View>
            { this.state.visibile && this.vehicleForm() }
            <View style = {{
              height: 70,
              justifyContent: 'flex-start',
              backgroundColor: eGobie.EGOBIE_WHITE,
              zIndex: -1,
            }}>
              <Button
                onPress = { () => { this.saveVehicle() } }
                title = 'ADD VEHICLE'
                buttonStyle = {{
                  backgroundColor: eGobie.EGOBIE_BLUE,
                  ...BoxShadow
                }}
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
    hideVehicle: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    },
    showPicker: (type) => {
      dispatch({
        type,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModal);
