import React, { Component } from 'react';
import { View, Modal } from 'react-native';

import Calendar from 'react-native-calendar';

import eGobie from '../Styles/Egobie';


const customStyle = {
  calendarControls: {
    backgroundColor: eGobie.EGOBIE_BLUE,
    
  },
  calendarHeading: {
    backgroundColor: eGobie.EGOBIE_BLUE,
  },
  controlButton: {
    backgroundColor: eGobie.EGOBIE_BLUE,
  },
  controlButtonText: {
    color: eGobie.EGOBIE_WHITE,
  },
  day: {
    color: eGobie.EGOBIE_BLACK,
  }
}

class CalendarScreen extends Component {

  render() {
    return (
      <Calendar
        customStyle = { customStyle }
      />
    );
  }
};

CalendarScreen.propTypes = {

}

export default CalendarScreen;