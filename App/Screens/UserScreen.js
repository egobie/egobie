import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
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
  static navigationOptions = ({ navigation }) => ({
    title: 'USER',
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

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  }

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
            defaultValue = { this.props.firstName }
            onChangeText = { (text) => { this.user.firstName = text; } }
            { ...customStyle }
          />
          <Kohana
            label = { 'Last Name' }
            iconName = { 'account' }
            autoCapitalize = { 'words' }
            defaultValue = { this.props.lastName }
            onChangeText = { (text) => { this.user.lastName = text; } }
            { ...customStyle }
          />
          <Kohana
            label = { 'Email' }
            keyboardType = { 'email-address' }
            iconName = { 'email' }
            defaultValue = { this.props.email }
            onChangeText = { (text) => { this.user.email = text; } }
            { ...customStyle }
          />
          <Kohana
            label = { 'Phone Number' }
            keyboardType = { 'phone-pad' }
            iconName = { 'cellphone' }
            defaultValue = { this.props.phoneNumber }
            onChangeText = { (text) => { this.user.phoneNumber = text; } }
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

const mapStateToProps = (state, ownProps) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    phoneNumber: state.user.phoneNumber,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
