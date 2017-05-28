import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as PickerAction from '../Actions/PickerAction';
import * as ServiceAction from '../Actions/ServiceAction';
import ConfirmModal from '../Modals/ConfirmModal';
import Label from '../Components/Label';
import VehicleIcons from '../Libs/VehicleIcon';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class ReservationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'RESERVATIONS',
    headerTitleStyle: {
      fontWeight: '400',
    },
    headerLeft: (
      <TouchableWithoutFeedback onPress = { () => navigation.goBack() } >
        <View>
          <Icon
            type = { 'material-community' }
            name = { 'chevron-left' }
            iconStyle = {{
              color: eGobie.EGOBIE_BLUE,
              fontWeight: '400',
              fontSize: 35,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    ),
  });

  items = {
    location: {
      title: 'Location',
      key: 'location',
      icon: 'map-marker-radius',
    },
    service: {
      title: 'Services',
      key: 'services',
      icon: 'car-wash',
    },
    schedule: {
      title: 'Date',
      key: 'day',
      icon: 'calendar-check',
    },
    car: {
      title: 'Vehicle',
      key: 'plate',
      icon: 'car',
    },
    price: {
      title: 'Price',
      label: 'price',
      icon: 'cash',
    },
  };

  cancelReservation = (reservation) => {
    this.confirmModal.show(
      'Are you sure to cancel reservation?',
      () => { this.props.cancelReservation(reservation.id) },
      () => {},
    );
  }

  renderReservations() {
    return this.props.reservations.map((reservation, i) => {
      return (
        <View key = { i } style = {{
          paddingBottom: 10,
          transform: [
            { scale: 0.9, },
          ],
          ...BoxShadow,
        }}>
          <View style = {{
            flexDirection: 'row',
            paddingLeft: 15,
            backgroundColor: eGobie.EGOBIE_BLUE,
          }}>
            <Text style = {{
              height: 40,
              lineHeight: 40,
              fontSize: 18,
              marginRight: 15,
              color: eGobie.EGOBIE_WHITE,
            }}>Reservation #</Text>
            <Text style = {{
              height: 40,
              lineHeight: 40,
              fontSize: 18,
              color: eGobie.EGOBIE_WHITE,
            }}>{reservation.reservationId}</Text>
          </View>
          <View>
          {
            Object.keys(this.items).map((item, i) => {
              return <Label
                key = { i }
                hideChevron
                leftIcon = {{
                  type: 'material-community',
                  name: this.items[item].icon,
                  color: eGobie.EGOBIE_BLUE,
                }}
                title = { this.items[item].title }
                titleStyle = {{
                  color: eGobie.EGOBIE_GREY,
                  fontSize: 12,
                }}
                value = { reservation[this.items[item].key] }
                valueStyle = {{
                  color: eGobie.EGOBIE_BLACK,
                  fontSize: 12,
                }}
                style = {{
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: eGobie.EGOBIE_GREY,
                }}
              />
            })
          }
          </View>
          <Button
            onPress = { () => { this.cancelReservation(reservation) } }
            title = 'CANCEL'
            backgroundColor = { eGobie.EGOBIE_RED }
            buttonStyle = {{
              marginTop: 8,
            }}
          />
        </View>
      );
    });
  }

  render() {
    return (
      <View style = {{
        flex: 1,
      }}>
        <ScrollView>
          { this.renderReservations() }
        </ScrollView>
        <ConfirmModal ref = { (ref) => { this.confirmModal = ref; } }/>
      </View>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    reservations: state.service.reservations,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelReservation: (id) => {
      dispatch({
        type: ServiceAction.SERVICE_CANCEL_RESERVATION,
        id,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen);
