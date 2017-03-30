import React, { Component } from 'react';
import { View } from 'react-native';

import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import * as CalendarAction from '../Actions/CalendarAction';
import BoxShadow from '../Styles/BoxShadow';
import eGobie from '../Styles/Egobie';


class Range extends Component {
  state = {
    checked: false,
  };

  constructor(props) {
    super(props);
  }

  onPress = () => {
    this.props.selectRange(this.props.range);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRange !== this.props.range) {
      this.setState({
        checked: false,
      });
    } else {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    return (
      <CheckBox
        center
        iconRight
        checked = { this.state.checked }
        title = { this.props.range }
        uncheckedColor = { eGobie.EGOBIE_GREY }
        checkedColor = { eGobie.EGOBIE_GREEN }
        textStyle = {{
          fontSize: 13,
          fontWeight: '400',
          color: eGobie.EGOBIE_BLACK,
        }}
        containerStyle = {{
          backgroundColor: eGobie.EGOBIE_WHITE,
          ...BoxShadow
        }}
        onPress = { this.onPress }
      />
    );
  }
}

Range.propTypes = {
  range: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedRange: state.calendar.range,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRange: (range) => {
      dispatch({
        type: CalendarAction.CALENDAR_SELECT_RANGE,
        range,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Range);
