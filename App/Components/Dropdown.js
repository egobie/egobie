import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';


class Dropdown extends Component {
  options() {
    return this.props.options.map((option, i) => {
      return (
        <Text
          key = { i }
          onPress = { () => { this.props.onSelect(option.key) } }
        >
          { option.label }
        </Text>
      );
    });
  }

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator = { false }
        
      >
        { this.options() }
      </ScrollView>
    );
  }
};

Dropdown.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
  })).isRequired,
  onSelect: React.PropTypes.func.isRequired,
  selectStyle: React.PropTypes.objectOf(React.PropTypes.shape({
    style: React.PropTypes.object,
    styleText: React.PropTypes.object,
    styleOption: React.PropTypes.object,
  })),
  optionStyle: React.PropTypes.objectOf(React.PropTypes.shape({
    style: React.PropTypes.object,
    styleText: React.PropTypes.object,
  })),
  overlayStyles: React.PropTypes.object,
};

export default Dropdown;
