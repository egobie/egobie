import React, { Component } from 'react';
import { View } from 'react-native';

import eGobie from '../Styles/Egobie';
import Dimensions from '../Libs/Dimension';

const DropDown = require('react-native-dropdown');

class Dropdown extends Component {
  constructor(props) {
    super(props);
  }

  options() {
    return this.props.options.map((option, i) => {
      return (
        <DropDown.Option
          key = { i }
          style = {{
            padding: 0,
          }}
          styleText = {{
            height: 30,
            fontSize: 16,
            fontWeight: '400',
            paddingLeft: 30,
            paddingTop: 10,
            color: eGobie.EGOBIE_BLACK,
          }}
        >
          { option.label }
        </DropDown.Option>
      );
    });
  }

  optionList = () => {
    return this.optionsRef;
  }

  componentDidMount() {
    DropDown.updatePosition(this.selectRef);
    DropDown.updatePosition(this.optionsRef);
  }

  render() {
    return (
      <View style = {{
        marginBottom: 10,
      }}>
        <DropDown.Select
          ref = { (ref) => { this.selectRef = ref; } }
          optionListRef = { this.optionList }
          defaultValue = { this.props.placeholder }
          height = { 40 }
          width = { Dimensions.width * 0.9 }
          style = {{
            borderWidth: 0,
            marginTop: 0,
          }}
          styleOption = {{
            padding: 0,
          }}
          styleText = {{
            height: 40,
            fontSize: 16,
            fontWeight: '400',
            paddingLeft: 30,
            paddingTop: 10,
            color: eGobie.EGOBIE_WHITE,
            backgroundColor: eGobie.EGOBIE_BLUE,
          }}
        >
          { this.options() }
        </DropDown.Select>
        <DropDown.OptionList ref = { (ref) => { this.optionsRef = ref; } } />
      </View>
    );
  }
};

Dropdown.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
  })).isRequired,
  placeholder: React.PropTypes.string.isRequired,
  zIndex: React.PropTypes.number,
};

export default Dropdown;
