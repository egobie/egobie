import React, { Component } from 'react';
import { View, Modal } from 'react-native';

import Calendar from 'react-native-calendar';

import eGobie from '../Styles/Egobie';


const customStyle = {
  title: {
    color: eGobie.EGOBIE_WHITE,
  },
  calendarControls: {
    backgroundColor: eGobie.EGOBIE_BLACK,
    borderBottomWidth: 0,
  },
  calendarHeading: {
    backgroundColor: eGobie.EGOBIE_BLACK,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  controlButton: {
    backgroundColor: eGobie.EGOBIE_BLACK,
  },
  controlButtonText: {
    color: eGobie.EGOBIE_WHITE,
  },
  dayHeading: {
    color: eGobie.EGOBIE_GREY,
    fontWeight: '500',
  },
  day: {
    color: eGobie.EGOBIE_BLACK,
  },
  weekendHeading: {
    color: eGobie.EGOBIE_WHITE,
    fontWeight: '500',
  },
  currentDayCircle: {
    backgroundColor: eGobie.EGOBIE_GREEN,
  },
  currentDayText: {
    color: eGobie.EGOBIE_BLUE,
    fontWeight: '800',
  },
  selectedDayCircle: {
    backgroundColor: eGobie.EGOBIE_BLUE,
  },
  selectedDayText: {
    color: eGobie.EGOBIE_WHITE,
  },
  eventIndicator: {
    backgroundColor: eGobie.EGOBIE_BLUE,
  }
}

class CalendarScreen extends Component {

  render() {
    return (
      <Calendar
        showEventIndicators
        customStyle = { customStyle }
        eventDates={['2017-02-01', '2017-02-03', '2017-02-05']}
      />
    );
  }
};

CalendarScreen.propTypes = {

}

export default CalendarScreen;