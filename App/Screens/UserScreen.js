import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Kohana } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';

import * as UserAction from '../Actions/UserAction';
import * as MessageAction from '../Actions/MessageAction';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';
import Dimension from '../Libs/Dimension';
import * as Validator from '../Libs/Validator';


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

  updateUser = () => {
    if (!Validator.validateEmail(this.user.email)) {
      this.props.showErrorMessage('Please enter valid Email');
      return;
    }

    if (this.user.firstName.length === 0) {
      this.props.showErrorMessage('Please enter first name');
      return;
    }

    if (this.user.lastName.length === 0) {
      this.props.showErrorMessage('Please enter last name');
      return;
    }

    if (!Validator.validatePhone(this.user.phoneNumber)) {
      this.props.showErrorMessage('Please enter valid phone number');
      return;
    }

    this.props.updateUser(
      this.user.firstName, this.user.lastName, this.user.email, this.user.phoneNumber,
    );
  }

  render() {
    let { firstName, lastName, email, phoneNumber } = this.props;
    this.user = {
      firstName, lastName, email, phoneNumber,
    };

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
          onPress = { this.updateUser }
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
    updateUser: (firstName, lastName, email, phoneNumber) => {
      dispatch({
        type: UserAction.USER_UPDATE,
        firstName, lastName, email, phoneNumber,
      });
    },
    showErrorMessage: (message) => {
      dispatch({
        type: MessageAction.MESSAGE_SHOW,
        message,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
