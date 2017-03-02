import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { ListItem, Button, Icon } from 'react-native-elements';

import ViechleModal from '../Modals/VehicleModal';
import VehicleIcons from '../Libs/VehicleIcon';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class VehicleScreen extends Component {
  static navigationOptions = {
    title: 'Vehicles',
    header: ({ goBack }) => ({
      titleStyle: {
        fontWeight: '400',
      },
      left: (
        <TouchableWithoutFeedback
          onPress = { () => goBack() }
        >
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
    }),
  };

  showVehicleModal() {
    this.refs.vehicle.show();
  }

  vehicles() {
    return ['suv', 'sedan', 'truck', 'van'].map((mode, i) => {
      return (
        <TouchableWithoutFeedback
          key = { i }
        >
          <View>
            <ListItem
              hideChevron
              avatar = { VehicleIcons[mode] }
              avatarStyle = {{
                width: 40,
                borderRadius: 5,
              }}
              title = { 'Y96EUV' }
              titleStyle = {{
                color: eGobie.EGOBIE_BLACK,
                fontSize: 16,
                fontWeight: '500',
              }}
              rightTitle = { 'NJ 2012' }
              subtitle = { 'Honda Accord' }
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
      <ScrollView>
        { this.vehicles() }
        <Button
          onPress = { () => { this.showVehicleModal() } }
          title = 'ADD NEW VEHICLE'
          buttonStyle = {{
            marginTop: 10,
            backgroundColor: eGobie.EGOBIE_BLUE,
            ...BoxShadow
          }}
        />
        <ViechleModal ref = { 'vehicle' }/>
      </ScrollView>
    );
  }
};

export default VehicleScreen;