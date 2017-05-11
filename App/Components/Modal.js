import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

import Dimension from '../Libs/Dimension';


export default class Modal extends Component {
  state = {
    zIndex: -1,
    top: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        zIndex: 2,
      });

      if (this.props.animated) {
        Animated.timing(this.state.top, {
          toValue: 0,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
    } else {
      if (this.props.animated) {
        Animated.timing(this.state.top, {
          toValue: Dimension.height,
          easing: Easing.out(Easing.cubic),
        }).start(() => {
          // this.resetState();
        });
      } else {
        this.resetState();
      }
    }
  }

  resetState = () => {
    this.setState({
      zIndex: -1,
    });
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        top: this.state.top,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: this.state.zIndex,
        borderWidth: 10,
      }}>
        <View style = {{position : 'relative'}}>
        { this.props.children }
        </View>
      </Animated.View>
    );
  }
}