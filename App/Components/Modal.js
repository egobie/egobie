import React, { Component } from 'react';
import { View } from 'react-native';


export default class Modal extends Component {
  state = {
    zIndex: -1,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        zIndex: 2,
      });
    } else {
      this.setState({
        zIndex: -1,
      });
    }
  }

  render() {
    return (
      <View style = {{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: this.state.zIndex,
      }}>
        { this.props.children }
      </View>
    );
  }
}