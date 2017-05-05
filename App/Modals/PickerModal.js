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
    this.props.pick(selected);
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
    Reactotron.log(nextProps);
    if (nextProps.options.length > 0) {
      Reactotron.log('Show Picker');
      this.show(nextProps.selected);
    } else if (this.state.visible) {
      this.hide();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = nextState.visible !== this.state.visible || nextState.selected !== this.state.selected;
    if (update) {
      Reactotron.log('shouldComponentUpdate - Picker');
    }
    return update;
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
              height: 300,
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
                title = 'CONFIRM'
                buttonStyle = {{
                  marginTop: 20,
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidePicker: () => {
      dispatch({
        type: PickerAction.PICKER_HIDE,
      });
    },
    pick: (selected) => {
      dispatch({
        type: PickerAction.PICKER_PICK,
        selected,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickerModal);

