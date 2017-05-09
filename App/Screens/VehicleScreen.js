import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { ListItem, Button, Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import VehicleIcons from '../Libs/VehicleIcon';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class VehicleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'VEHICLES',
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

  addVehicle = () => {
    this.props.addVehicle();
  }

  vehicles() {
    // ['suv', 'sedan', 'truck', 'van']
    return this.props.cars.map((car, i) => {
      return (
        <TouchableWithoutFeedback key = { i } >
          <View>
            <ListItem
              hideChevron
              avatar = { VehicleIcons['sedan'] }
              avatarStyle = {{
                width: 40,
                borderRadius: 5,
              }}
              title = { car.plate }
              titleStyle = {{
                color: eGobie.EGOBIE_BLACK,
                fontSize: 16,
                fontWeight: '500',
              }}
              rightTitle = { `${car.state} ${car.year}` }
              subtitle = { `${car.make} ${car.model}` }
              subtitleStyle = {{
                fontSize: 14,
                fontWeight: '400',
              }}
              containerStyle = {{
                marginTop: 5,
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: eGobie.EGOBIE_WHITE,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  render() {
    return (
      <View style = {{
        flex: 1,
      }}>
        <ScrollView>
          { this.vehicles() }
        </ScrollView>
        <Button
          onPress = { this.addVehicle }
          title = 'ADD NEW VEHICLE'
          buttonStyle = {{
            marginBottom: 30,
            backgroundColor: eGobie.EGOBIE_BLUE,
            ...BoxShadow
          }}
        />
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleScreen);
