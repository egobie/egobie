import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { ListItem } from 'react-native-elements';


class Label extends Component {
  render() {
    return (
      <ListItem
        onPress = { this.props.onPress && this.props.onPress }
        onLongPress = { this.props.onLongPress && this.props.onLongPress }
        avatar = { this.props.avatar && this.props.avatar }
        avatarStyle = { this.props.avatarStyle && this.props.avatarStyle }
        hideChevron = { !this.props.rightIcon }
        title = { this.props.title }
        titleStyle = { this.props.titleStyle && this.props.titleStyle }
        titleContainerStyle = { this.props.titleWrapperStyle && this.props.titleWrapperStyle }
        subtitle = { this.props.value }
        subtitleStyle = { this.props.valueStyle && this.props.valueStyle }
        subtitleContainerStyle = { this.props.valueWrapperStyle && this.props.valueWrapperStyle }
        leftIcon = { this.props.leftIcon && this.props.leftIcon }
        rightIcon = { this.props.rightIcon && this.props.rightIcon }
        containerStyle = { this.props.style && this.props.style }
        wrapperStyle = {{
          marginLeft: 0,
          marginRight: -10,
        }}
      />
    );
  }
}

Label.propTypes = {
  title: React.PropTypes.any.isRequired,
  value: React.PropTypes.any.isRequired,
  titleStyle: React.PropTypes.object,
  titleWrapperStyle: React.PropTypes.object,
  valueStyle: React.PropTypes.object,
  valueWrapperStyle: React.PropTypes.object,
  style: React.PropTypes.object,
  leftIcon: React.PropTypes.object,
  rightIcon: React.PropTypes.object,
  onPress: React.PropTypes.func,
  onLongPress: React.PropTypes.func,
  avatar: React.PropTypes.any,
  avatarStyle: React.PropTypes.object,
}

export default Label;
