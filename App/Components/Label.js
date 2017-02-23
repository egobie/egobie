import React, { Component } from 'react';
import { View } from 'react-native';

import { ListItem } from 'react-native-elements';


class Label extends Component {
  render() {
    return (
      <ListItem
        hideChevron
        title = { this.props.title }
        titleStyle = { this.props.titleStyle && this.props.titleStyle }
        subtitle = { this.props.value }
        subtitleStyle = { this.props.valueStyle && this.props.valueStyle }
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
  valueStyle: React.PropTypes.object,
  style: React.PropTypes.object,
  leftIcon: React.PropTypes.object,
  rightIcon: React.PropTypes.object,
}

export default Label;
