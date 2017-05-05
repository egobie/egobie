import React, { Component } from 'react';
import { View, ScrollView, Animated, Modal, Easing } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';

import * as PickerAction from '../Actions/PickerAction';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class PickerModal extends Component {
  state = {
    visible: false,
    selected: null,
    pickerScale: new Animated.Value(0.85),
  };

  constructor(props) {
    super(props);
  }

  show = (selected) => {
    this.setState({
      visible: true,
      selected,
    });
  }

  hide = () => {
    this.props.hidePicker();
    this.setState({
      visible: false,
      selected: null,
    });
  }

  pick = (selected) => {
    switch (this.props.target) {
      case 'make':
        this.props.pick(PickerAction.PICKER_PICK_VEHICLE_MAKE, selected);
        break;

      case 'model':
        this.props.pick(PickerAction.PICKER_PICK_VEHICLE_MODEL, selected);
        break

      case 'state':
        this.props.pick(PickerAction.PICKER_PICK_VEHICLE_STATE, selected);
        break

      case 'color':
        this.props.pick(PickerAction.PICKER_PICK_VEHICLE_COLOR, selected);
        break

      case 'year':
        this.props.pick(PickerAction.PICKER_PICK_VEHICLE_YEAR, selected);
        break
    }

    this.setState({
      selected,
    });
  }

  scrollList = () => {
    return this.props.options.map((option, i) => {
      return (
        <CheckBox
          key = { i }
          title = { option.label }
          checked = { option.key === this.state.selected }
          onPress = { () => { this.pick(option.key); } }
        />
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.length > 0) {
      this.show(nextProps.selected);
    } else if (this.state.visible) {
      this.hide();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible ||
      nextState.selected !== this.state.selected || nextProps.target !== this.props.target;
  }

  render() {
    return (
      <Modal
        transparent
        animationType = { 'slide' }
        visible = { this.state.visible }
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
            <ScrollView style = {{
              height: 300,
              marginTop: 15,
              paddingTop: 10,
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              { this.scrollList() }
            </ScrollView>
            <View style = {{
              height: 80,
              justifyContent: 'flex-start',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              <Button
                onPress = { this.hide }
                title = 'CLOSE'
                buttonStyle = {{
                  marginTop: 15,
                }}
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
    options: state.picker.options,
    selected: state.picker.selected,
    target: state.picker.target,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidePicker: () => {
      dispatch({
        type: PickerAction.PICKER_HIDE,
      });
    },
    pick: (type, selected) => {
      dispatch({
        type, selected,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickerModal);

