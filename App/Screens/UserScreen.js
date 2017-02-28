import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Kohana } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';

import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';
import Dimension from '../Libs/Dimension';


const customStyle = {
  iconClass: MaterialCommunityIcon,
  iconColor: eGobie.EGOBIE_BLUE,
  style: {
    marginBottom: 5,
    width: Dimension.width - 20,
  },
  labelStyle: {
    color: eGobie.EGOBIE_BLUE,
    fontWeight: '400',
    fontSize: 14,
  },
  inputStyle: {
    color: eGobie.EGOBIE_BLACK,
    fontSize: 12,
  },
}

class UserScreen extends Component {
  static navigationOptions = {
    title: 'User',
    header: ({ goBack }) => ({
      titleStyle: {
        fontWeight: '400',
      },
      left: (
        <TouchableWithoutFeedback onPress = { () => goBack() }>
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

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {{
        height: Dimension.height * 0.75,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        <View style = {{
          height: 200,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Kohana
            label = { 'First Name' }
            iconName = { 'account' }
            autoCapitalize = { 'words' }
            { ...customStyle }
          />
          <Kohana
            label = { 'Last Name' }
            iconName = { 'account' }
            autoCapitalize = { 'words' }
            { ...customStyle }
          />
          <Kohana
            label = { 'Email' }
            keyboardType = { 'email-address' }
            iconName = { 'email' }
            { ...customStyle }
          />
          <Kohana
            label = { 'Phone Number' }
            keyboardType = { 'phone-pad' }
            iconName = { 'cellphone' }
            { ...customStyle }
          />
        </View>
        <Button
          title = 'Save'
          buttonStyle = {{
            width: Dimension.width - 20,
            marginTop: 10,
            marginLeft: 10,
            backgroundColor: eGobie.EGOBIE_BLUE,
            ...BoxShadow,
          }}
        />
      </View>
    );
  }
};

UserScreen.propTypes = {

};

export default UserScreen;