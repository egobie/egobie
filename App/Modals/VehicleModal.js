import React, { Component } from 'react';
import { View, Animated, Modal, Easing } from 'react-native';

import { Kaede } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';

import Dropdown from '../Components/Dropdown';
import Dimension from '../Libs/Dimension';
import States from '../Libs/States';
import Colors from '../Libs/Colors';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


const inputDefaultProps = {
  labelStyle: {
    fontSize: 16,
    marginLeft: 30,
    fontWeight: '400',
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

const dropDownStyle = {
  style: {
    flex: 1,
    backgroundColor: eGobie.EGOBIE_BLUE,
    paddingLeft: 5,
  },
  styleText: {
    color: eGobie.EGOBIE_WHITE,
  }
}

class VehicleModal extends Component {
  state = {
    visibile: false,
  };

  animation = {
    cardScale: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.show = this._show.bind(this);
    this.hide = this._hide.bind(this);
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

  _onSelect(value, type) {

  }

  getYears() {
    let year = new Date().getFullYear() + 1;
    let years = [];
    let limit = 1980;

    for (let i = year; i >= limit; i--) {
      years.push(i);
    }

    return years.map((y) => {
      return { name: `${y}`, value: `${y}` };
    });
  }

  componentDidMount() {
    this.show();
  }

  vehicleForm() {
    return (
      <View style = {{
        height: 350,
        paddingLeft: 15,
        paddingRight: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <Kaede
          label = { 'PLATE' }
          { ...inputDefaultProps }
        />
        <Kaede
          label = { 'MAKE' }
          { ...inputDefaultProps }
        />
        <Kaede
          label = { 'MODEL' }
          { ...inputDefaultProps }
        />
        <Kaede
          label = { 'STATE' }
          { ...inputDefaultProps }
        />
        <Kaede
          label = { 'YEAR' }
          { ...inputDefaultProps }
        />
      </View>
    );
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
            height: 450,
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
            { this.vehicleForm() }
            <View style = {{
              height: 70,
              justifyContent: 'flex-start',
              backgroundColor: eGobie.EGOBIE_WHITE,
            }}>
              <Button
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

export default VehicleModal;
