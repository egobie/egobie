import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import Calendar from 'react-native-calendar';
import { CheckBox, Icon, Button } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as CalendarAction from '../Actions/CalendarAction';
import Modal from '../Components/Modal';
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
    scale: new Animated.Value(0),
    translateY: new Animated.Value(250),
    visible: false,
    selectedDate: null,
    pickUpBy: 0,
  };

  constructor(props) {
    super(props);
  }

  onDateSelect = (date) => {
    let dateString = moment(date).format('YYYY-MM-DD');

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 0.85,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(this.state.translateY, {
          toValue: 0,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }, 500);

    this.setState({
      selectedDate: dateString,
    });
  }

  confirmDate = () => {
    this.props.selectDate(this.state.selectedDate);
    this.hide();
  }

  show = () => {
    this.setState({ visible: true });
    setTimeout(() => {
      Animated.spring(this.state.scale, {
        toValue: 0.95,
        friction: 4,
        tension: 40,
      }).start();
    }, 100);
  };

  hide = () => {
    Animated.parallel([
      Animated.timing(this.state.translateY, {
        toValue: 250,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.scale, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start(() => {
      this.resetState();
      this.props.hideCalendar();
    });
  };

  resetState = () => {
    this.setState({
      visible: false,
      selectedDate: null,
    });
  }

  renderSchedules() {
    let { selectedDate, pickUpBy } = this.state;
    let dateString = moment().format('YYYY-MM-DD');
    let available = selectedDate && this.props.openings[selectedDate];

    return (
      <View style = {{
        flex: 1,
      }}>
        {
          selectedDate === dateString && <Text style = {{
            height: 80,
            lineHeight: 80,
            fontSize: 14,
            color: eGobie.EGOBIE_SHADOW,
            textAlign: 'center',
          }}>There are 0 people in front of you</Text>
        }
        {
          selectedDate !== dateString && available && <View>
            <CheckBox
              title = { 'Pick up your car by 01:00 P.M.' }
              textStyle = {{
                fontSize: 11,
                color: eGobie.EGOBIE_SHADOW,
              }}
              checked = { pickUpBy === 1 }
              onPress = { () => { this.setState({ pickUpBy: 1 }); } }
            />
            <CheckBox
              title = { 'Pick up your car by 05:00 P.M.' }
              textStyle = {{
                fontSize: 11,
                color: eGobie.EGOBIE_SHADOW,
              }}
              checked = { pickUpBy === 5 }
              onPress = { () => { this.setState({ pickUpBy: 5 }); } }
            />
          </View>
        }
        {
          selectedDate !== dateString && !available && <Text style = {{
            height: 100,
            lineHeight: 100,
            fontSize: 16,
            color: eGobie.EGOBIE_SHADOW,
            textAlign: 'center',
          }}>No openings for this day.</Text>
        }
        {
          (selectedDate === dateString || available) && <Button
            onPress = { this.confirmDate }
            title = { 'Confirm' }
            backgroundColor = { eGobie.EGOBIE_BLUE }
            buttonStyle = {{
              marginTop: 20,
            }}
          />
        }
      </View>
    );
  }



  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_CALENDAR:
        this.show();
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible || nextState.selectedDate !== this.state.selectedDate ||
      nextState.pickUpBy !== this.state.pickUpBy;
  }

  render() {
    return (
      <Modal visible = { this.state.visible } >
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
              { scale: this.state.scale },
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
              showControls
              showEventIndicators
              scrollEnabled
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
              { translateY: this.state.translateY },
            ],
          }}>
            { this.renderSchedules() }
          </Animated.View>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
    openings: state.service.openings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDate: (date, pickUpBy) => {
      dispatch({
        type: CalendarAction.CALENDAR_SELECT_DATE,
        date, pickUpBy,
      });
    },
    hideCalendar: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
