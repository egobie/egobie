import React, { Component } from 'react';
import { View, Image, Text, Platform } from 'react-native';

import PlateBgs from '../Libs/PlateBg';
import eGobie from '../Styles/Egobie';


class Plate extends Component {
  fontFamily = Platform.select({
    ios: 'Courier',
    android: 'monospace'
  });

  baseStype = {
    position: 'absolute',
    fontFamily: this.fontFamily,
    left: 0,
    right: 0,
    textShadowRadius: 1,
    textShadowColor: eGobie.EGOBIE_WHITE,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
  };

  constructor(props) {
    super(props);
  }

  stateName() {
    return (
      <Text style = {[ this.baseStype, {
        fontSize: 25,
        top: 10,
      } ]}>
        { this.props.state.toUpperCase() }
      </Text>
    );
  }

  stateSlogan() {
    return (
      <Text style = {[ this.baseStype, {
        fontSize: 20,
        bottom: 10,
      } ]}>
        { 'Garden State' }
      </Text>
    );
  }

  number() {
    return (
      <Text style = {[ this.baseStype, {
        fontSize: 45,
        top: 70,
      } ]}>
        { this.props.number.toUpperCase() }
      </Text>
    );
  }

  render() {
    let index = this.props.index ? this.props.index % 3 : 0;

    return (
      <View style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source = { PlateBgs[`plate${index}`] }
          style = {{
            width: 300,
            height: 190,
            borderRadius: 10,
            transform: [
              { scale: this.props.plateScale ? this.props.plateScale : 1 }
            ],
          }}
        >
          { this.stateName() }
          { this.number() }
          { this.stateSlogan() }
        </Image>
      </View>
    );
  }
};

Plate.propTypes = {
  number: React.PropTypes.string.isRequired,
  state: React.PropTypes.string.isRequired,
  plateScale: React.PropTypes.number,
  index: React.PropTypes.number,
};

export default Plate;
