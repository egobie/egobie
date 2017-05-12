import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

import Dimension from '../Libs/Dimension';


export default class Modal extends Component {
  state = {
    zIndex: -1,
    translateY: new Animated.Value(0),
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
        Animated.timing(this.state.translateY, {
          toValue: 0,
          easing: Easing.inOut(Easing.ease),
        }).start();
      }
    } else {
      if (this.props.animated) {
        Animated.timing(this.state.translateY, {
          toValue: Dimension.height,
          easing: Easing.inOut(Easing.ease),
        }).start(() => {
          this.resetState();
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

  componentDidMount() {
    if (this.props.animated) {
      this.setState({
        translateY: new Animated.Value(Dimension.height),
      });
    }
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: this.state.zIndex,
        transform: [
          { translateY: this.state.translateY },
        ],
      }}>
        { this.props.children }
      </Animated.View>
    );
  }
}