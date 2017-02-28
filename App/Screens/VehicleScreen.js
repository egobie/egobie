import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { ListItem, Button, Icon } from 'react-native-elements';

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

  vehicles() {
    return [1, 2].map((_, i) => {
      return (
        <TouchableWithoutFeedback
          key = { i }
        >
          <View>
            <ListItem
              hideChevron
              avatarStyle = {{
                width: 50,
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
          title = 'ADD NEW VEHICLE'
          buttonStyle = {{
            marginTop: 10,
            backgroundColor: eGobie.EGOBIE_BLUE,
            ...BoxShadow
          }}
        />
      </ScrollView>
    );
  }
};

export default VehicleScreen;