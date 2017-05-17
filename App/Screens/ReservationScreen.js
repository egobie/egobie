import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as PickerAction from '../Actions/PickerAction';
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
      value: '414 Hackensack Avenue',
      icon: 'map-marker-radius',
    },
    service: {
      title: 'Services',
      value: 'Premium',
      icon: 'car-wash',
    },
    schedule: {
      title: 'Date',
      value: '2017-09-01',
      icon: 'calendar-check',
    },
    car: {
      title: 'Vehicle',
      value: 'Y96EUV',
      icon: 'car',
    },
    price: {
      title: 'Price',
      value: '$80.91',
      icon: 'cash',
    },
  };

  reservations() {
    return [1].map((car, i) => {
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
            }}>YXJDHF1894</Text>
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
                value = { this.items[item].value }
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
          { this.reservations() }
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cars: state.vehicle.all,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVehicle: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_VEHICLE,
      });
    },
    editVehicle: (id, plate, make, model, color, state, year) => {
      dispatch({
        type: PickerAction.PICKER_PICK_INIT_VEHICLE,
        id, plate, make, model, color, state, year,
      });
      dispatch({
        type: WorkflowAction.WORK_FLOW_VEHICLE,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationScreen);
