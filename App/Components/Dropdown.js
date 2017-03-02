import React, { Component } from 'react';
import { Animated, ScrollView, Text, Easing } from 'react-native';

import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class Dropdown extends Component {
  state = {
    top: 0,
    left: 50,
  }
  animation = {
    height: new Animated.Value(200),
  };

  constructor(props) {
    super(props);
  }

  options() {
    return this.props.options.map((option, i) => {
      return (
        <Text
          key = { i }
          onPress = { () => { this.props.onSelect(option.key) } }
          style = {{
            textAlign: 'left',
            paddingLeft: 10,
            fontSize: 14,
            fontWeight: '400',
            height: 40,
            lineHeight: 40,
            color: eGobie.EGOBIE_BLACK,
          }}
        >
          { option.label }
        </Text>
      );
    });
  }

  setPosition(top, left) {
    this.setState({
      top: top,
      left: left,
    });
  }

  hide() {
    Animated.timing(this.animation.height, {
      toValue: 0,
      easing: Easing.inOut(Easing.cubic),
    }).start();
  }

  show() {
    Animated.timing(this.animation.height, {
      toValue: 200,
      easing: Easing.inOut(Easing.cubic),
    }).start();
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        top: this.state.top + 5,
        left: this.state.left,
        width: 200,
        height: this.animation.height,
        overflow: 'hidden',
        backgroundColor: eGobie.EGOBIE_WHITE,
        ...BoxShadow,
      }}>
        <ScrollView showsHorizontalScrollIndicator = { false } >
          { this.options() }
        </ScrollView>
      </Animated.View>
    );
  }
};

Dropdown.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
  })).isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

export default Dropdown;
