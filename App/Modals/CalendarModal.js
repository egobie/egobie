import React, { Component } from 'react';
import {
  View, ScrollView, TouchableWithoutFeedback, Modal, Animated, Easing,
} from 'react-native';

import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import Calendar from 'react-native-calendar';
import { CheckBox, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as CalendarAction from '../Actions/CalendarAction';
import Range from '../Components/Range';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';

const moment = require('moment');

const customStyle = {
  title: {
    color: eGobie.EGOBIE_WHITE,
  },
  calendarContainer: {

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
    fontSize: 12,
    fontWeight: '500',
  },
  day: {
    color: eGobie.EGOBIE_BLACK,
    fontSize: 13,
  },
  weekendHeading: {
    color: eGobie.EGOBIE_WHITE,
    fontSize: 12,
    fontWeight: '500',
  },
  weekendDayText: {
    color: eGobie.EGOBIE_BLACK,
    fontSize: 12,
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
    height: 6,
    width: 6,
    borderRadius: 3,
  }
}

const dayHeadings = [
  'SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT',
];

class CalendarModal extends Component {

  state = {
    visible: false,
    selectedDate: null,
  };
  animation = {
    scale: new Animated.Value(0),
    translateY: new Animated.Value(250),
  };

  constructor(props) {
    super(props);
  }

  onDateSelect = (date) => {
    let dateString = moment(date).format('YYYY-MM-DD');

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.animation.scale, {
          toValue: 0.85,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(this.animation.translateY, {
          toValue: 0,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }, 500);

    this.props.selectDate(dateString);
    this.setState({
      selectedDate: dateString,
    });
  }

  show = () => {
    this.setState({ visible: true });
    setTimeout(() => {
      Animated.spring(this.animation.scale, {
        toValue: 0.95,
        friction: 4,
        tension: 40,
      }).start();
    }, 100);
  };

  hide = () => {
    Animated.parallel([
      Animated.timing(this.animation.translateY, {
        toValue: 250,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start(() => {
      this.props.closeModal();
      this.setState({
        visible: false,
        selectedDate: null,
      });
    });
  };

  openingDays() {
    let openings = [];
    if (this.state.selectedDate) {
      if (this.state.selectedDate === '2017-03-31') {
        openings = [1, 2, 3, 4, 5, 6];
      } else {
        openings = [1, 2];
      }
    }

    return openings.map((_, i) => {
      return (
        <Range
          key = { i }
          range = '09:30 A.M. 10:00 A.M.'
        />
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_CALENDAR:
        this.show();
        break;
    }
  }

  render() {
    return (
      <Modal
        transparent
        animationType = { 'fade' }
        visible = { this.state.visible }
      >
        <View style = {{
          height: Dimension.height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          <Animated.View style = {{
            flex: 2,
            marginTop: 15,
            transform: [
              { scale: this.animation.scale },
            ],
          }}>
            <TouchableWithoutFeedback onPress = { this.hide }>
              <View>
                <Icon
                  type = { 'material-community' }
                  name = { 'close' }
                  color = { eGobie.EGOBIE_RED }
                />
              </View>
            </TouchableWithoutFeedback>
            <Calendar
              scrollEnabled
              showControls
              showEventIndicators
              nextButtonText = { 'Next' }
              prevButtonText = { 'Prev' }
              customStyle = { customStyle }
              dayHeadings = { dayHeadings }
              eventDates = {['2017-03-30', '2017-03-31', '2017-03-15']}
              onDateSelect = { this.onDateSelect }
            />
          </Animated.View>
          <Animated.View style = {{
            flex: 1,
            width: Dimension.width * 0.85,
            marginBottom: 10,
            backgroundColor: eGobie.EGOBIE_WHITE,
            transform: [
              { translateY: this.animation.translateY },
            ],
          }}>
            <ScrollView
              showsHorizontalScrollIndicator = { false }
              showsVerticalScrollIndicator = { false }
            >
              { this.openingDays() }
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDate: (date, range) => {
      dispatch({
        type: CalendarAction.CALENDAR_SELECT_DATE,
        date,
      });
    },
    closeModal: () => {
      Reactotron.log('dispatch - WorkflowAction.WORK_FLOW_BACK');
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
