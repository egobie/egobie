import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { Kaede } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as PickerAction from '../Actions/PickerAction';
import * as ErrorAction from '../Actions/ErrorAction';
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
    visible: false,
    cardScale: new Animated.Value(0),
  };
  car = {
    id: null,
    plate: null,
    make: null,
    model: null,
    color: null,
    state: null,
    year: null,
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({ visible: true });
    Animated.spring(this.state.cardScale, {
      toValue: 0.85,
      friction: 4,
      tension: 40,
    }).start();
  };

  hide = () => {
    Animated.timing(this.state.cardScale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.resetState();
      this.props.hideVehicle();
    });
  };

  resetState = () => {
    this.setState({
      visible: false,
    });
  };

  getYears = () => {
    let year = new Date().getFullYear() + 1;
    let years = [];
    let limit = 1980;

    for (let i = year; i >= limit; i--) {
      years.push({ key: `${i}`, label: `${i}` });
    }

    return years;
  };

  showMakePicker = () => {
    this.props.showPicker(this.props.makes, this.props.make, 'make');
  };

  showModelPicker = () => {
    if (this.props.make) {
      this.props.showPicker(this.props.models[this.props.make], this.props.model, 'model');
    } else {
      this.props.showErrorMessage('Please choose Make first');
    }
  };

  showColorPicker = () => {
    this.props.showPicker(Colors, this.props.color, 'color');
  };

  showStatePicker = () => {
    this.props.showPicker(States, this.props.state, 'state');
  };

  showYearPicker = () => {
    this.props.showPicker(this.getYears(), this.props.year, 'year');
  }

  getLabel = (options, key) => {
    let find = options.find((option) => {
      return option.key === key;
    });

    return find.label;
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
          defaultValue = { this.props.plate }
          onChangeText = { (text) => { this.props.plate = text; } }
          { ...inputDefaultProps }
        />
        <Button
          title = { this.props.make ? this.getLabel(this.props.makes, this.props.make) : 'MAKE' }
          onPress = { this.showMakePicker }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = { this.props.make && this.props.model ? this.getLabel(this.props.models[this.props.make], this.props.model) : 'MODEL' }
          onPress = { this.showModelPicker }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = { this.props.color ? this.props.color : 'COLOR' }
          onPress = { this.showColorPicker }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = { this.props.state ? this.getLabel(States, this.props.state) : 'STATE' }
          onPress = { this.showStatePicker }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
        <Button
          title = { this.props.year ? this.props.year : 'YEAR' }
          onPress = { this.showYearPicker }
          buttonStyle = { buttonStyle }
          textStyle = { buttonTextStyle }
        />
      </View>
    );
  }

  saveVehicle = () => {
    if (!this.props.plate) {
      this.props.showErrorMessage('Please input the Plate.');
      return;
    }

    if (!this.props.make) {
      this.props.showErrorMessage('Please choose Make.');
      return;
    }

    if (!this.props.model) {
      this.props.showErrorMessage('Please choose Model.');
      return;
    }

    if (!this.props.state) {
      this.props.showErrorMessage('Please choose State.');
      return;
    }

    if (!this.props.year) {
      this.props.showErrorMessage('Please choose Year.');
      return;
    }
  };

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_VEHICLE:
        this.show();
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible || nextProps.make !== this.props.make ||
      nextProps.model !== this.props.model || nextProps.color !== this.props.color ||
      nextProps.state !== this.props.state || nextProps.year !== this.props.year;
  }

  render() {
    return (
      <Modal visible = { this.state.visible } >
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
            { this.state.visible && this.vehicleForm() }
            <View style = {{
              height: 70,
              justifyContent: 'flex-start',
              backgroundColor: eGobie.EGOBIE_WHITE,
              zIndex: -1,
            }}>
              <Button
                onPress = { this.saveVehicle }
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
    makes: state.metadata.vehicleMakes,
    models: state.metadata.vehicleModels,
    make: state.picker.vehicleMake,
    model: state.picker.vehicleModel,
    state: state.picker.vehicleState,
    color: state.picker.vehicleColor,
    year: state.picker.vehicleYear,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideVehicle: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
      dispatch({
        type: PickerAction.PICKER_PICK_RESET,
      });
    },
    showPicker: (options, selected, target) => {
      dispatch({
        type: PickerAction.PICKER_SHOW,
        options, selected, target,
      });
    },
    showErrorMessage: (error) => {
      dispatch({
        type: ErrorAction.ERROR_SHOW,
        error,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModal);
