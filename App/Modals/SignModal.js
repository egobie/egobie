import React, { Component } from 'react';
import { View, Text, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { Button, Icon, SocialIcon } from 'react-native-elements';
import { Kohana } from 'react-native-textinput-effects';
import FlipCard from 'react-native-flip-card'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as UserAction from '../Actions/UserAction';
import * as ErrorAction from '../Actions/ErrorAction';
import Modal from '../Components/Modal';
import Dimension from '../Libs/Dimension';
import BoxShadow from '../Styles/BoxShadow';
import eGobie from '../Styles/Egobie';
import * as Validator from '../Libs/Validator';


class SignModal extends Component {
  state = {
    scale: new Animated.Value(0),
    flip: false,
    visible: false,
    signedIn: false,
  };
  defaultWidth = 260;
  inputDefaultProps = {
    iconClass: MaterialCommunityIcon,
    iconColor: eGobie.EGOBIE_BLUE,
    labelStyle: {
      fontSize: 14,
      marginLeft: 5,
      fontWeight: '400',
    },
    inputStyle: {
      fontSize: 14,
      fontWeight: '400',
      color: eGobie.EGOBIE_BLACK,
    },
    style: {
      borderBottomColor: eGobie.EGOBIE_GREY,
      borderBottomWidth: 1,
      marginBottom: 10,
      backgroundColor: eGobie.EGOBIE_WHITE,
      width: this.defaultWidth,
    },
  };
  socialIconProps = {
    iconSize: 24,
    style: {
      marginLeft: 0,
      marginRight: 0,
      transform: [
        { scale: 0.8 },
      ],
    }
  };

  signInForm = {
    username: '',
    password: '',
  };

  signUpForm = {
    username: '',
    password1: '',
    password2: '',
    fullname: '',
    email: '',
    phoneNumber: '',
  };

  constructor(props) {
    super(props);
  }

  goToSignUp = () => {
    this.setState({
      flip: true,
    });
  }

  goToSignIn = () => {
    this.setState({
      flip: false,
    });
  }

  goToResetPassword = () => {
    this.props.showResetPassword();
  }

  show = () => {
    this.setState({ visible: true });
    Animated.spring(this.state.scale, {
      toValue: 1,
      friction: 4,
      tension: 40,
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.scale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.resetState();
      this.props.hideSign();
    });
  }

  resetState = () => {
    this.setState({
      flip: false,
      visible: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    switch(nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_SIGN:
        this.show();
        break;
    }

    if (nextProps.signedIn) {
      if (!this.state.signedIn) {
        this.setState({
          signedIn: nextProps.signedIn,
        });
        this.hide();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible || nextState.flip !== this.state.flip;
  }

  signIn = () => {
    if (this.signInForm.username.length === 0) {
      this.props.showErrorMessage('Please input username');
      return;
    }

    if (this.signInForm.password.length === 0) {
      this.props.showErrorMessage('Please input password');
      return;
    }

    this.props.signIn(this.signInForm.username, this.signInForm.password);
  }

  signUp = () => {
    if (this.signUpForm.username.length === 0) {
      this.props.showErrorMessage('Please input username');
      return;
    }

    if (this.signUpForm.username.length < 5 || this.signUpForm.username.length > 16) {
      this.props.showErrorMessage('Username must be 5 - 16 characters');
      return;
    }

    if (this.signUpForm.password1.length === 0) {
      this.props.showErrorMessage('Please input password');
      return;
    }

    if (this.signUpForm.password1.length < 8 || this.signUpForm.password1.length > 20) {
      this.props.showErrorMessage('Password must be 8 - 20 characters');
      return;
    }

    if (this.signUpForm.password1 !== this.signUpForm.password2) {
      this.props.showErrorMessage('Password does not match');
      return;
    }

    if (!Validator.validateEmail(this.signUpForm.fullname)) {
      this.props.showErrorMessage('Please input Full Name');
      return;
    }

    if (!Validator.validateEmail(this.signUpForm.email)) {
      this.props.showErrorMessage('Please input valid Email');
      return;
    }

    if (!Validator.validatePhone(this.signUpForm.phoneNumber)) {
      this.props.showErrorMessage('Please input valid phone number');
      return;
    }
  }

  signInSide() {
    return (
      <View style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style = {{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: eGobie.EGOBIE_WHITE,
          ...BoxShadow,
        }}>
          <View style = {{
            width: this.defaultWidth,
            height: 30,
            marginTop: 15,
            alignItems: 'flex-end',
          }}>
            <Icon
              onPress = { this.hide }
              type = { 'material-community' }
              name = { 'close' }
              color = { eGobie.EGOBIE_RED }
            />
          </View>
          <View style = {{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Kohana
              label = { 'Username' }
              iconName = { 'account' }
              onChangeText = { (text) => { this.signInForm.username = text; } }
              { ...this.inputDefaultProps }
            />
            <Kohana
              secureTextEntry
              label = { 'Password' }
              iconName = { 'lock' }
              onChangeText = { (text) => { this.signInForm.password = text; } }
              { ...this.inputDefaultProps }
            />
          </View>
          <Button
            onPress = { this.signIn }
            title = 'SIGN IN'
            backgroundColor = { eGobie.EGOBIE_BLUE }
            buttonStyle = {{
              width: this.defaultWidth,
              marginTop: 10,
              marginBottom: 10,
              ...BoxShadow,
            }}
          />
          <View style = {{
            flexDirection: 'row',
            width: this.defaultWidth,
            height: 30,
            marginBottom: 15,
          }}>
            <Text
              onPress = { this.goToResetPassword }
              style = {{
                flex: 3,
                fontSize: 12,
                lineHeight: 30,
                textAlign: 'left',
                color: eGobie.EGOBIE_BLUE,
              }}
            >
              Recover your password
            </Text>
            <Text
              onPress = { this.goToSignUp }
              style = {{
                flex: 1,
                textAlign: 'right',
                fontSize: 12,
                lineHeight: 30,
                color: eGobie.EGOBIE_BLUE,
              }}
            >
              Sign Up
            </Text>
          </View>
          <View style = {{
            height: 50,
            width: this.defaultWidth,
            flexDirection: 'row',
            marginBottom: 10,
          }}>
            <Text style = {{
              flex: 2,
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 50,
              color: eGobie.EGOBIE_GREY,
            }}>
              or Sign In With
            </Text>
            <View style = {{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <SocialIcon type = 'google-plus-official' {...this.socialIconProps} />
              <SocialIcon type = 'facebook' {...this.socialIconProps} />
              <SocialIcon type = 'twitter' {...this.socialIconProps} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  signUpSide() {
    return (
      <View style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style = {{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: eGobie.EGOBIE_WHITE,
          ...BoxShadow,
        }}>
          <View style = {{
            flexDirection: 'row',
            width: this.defaultWidth,
            height: 30,
            marginTop: 15,
          }}>
            <View style = {{
              flex: 1,
              alignItems: 'flex-start',
            }}>
              <Text
                onPress = { this.goToSignIn }
                style = {{
                  color: eGobie.EGOBIE_BLUE,
                  lineHeight: 30,
                  fontSize: 14,
                }}
              >
                { '< Sign In' }
              </Text>
            </View>
            <View style = {{
              flex: 1,
              alignItems: 'flex-end',
            }}>
              <Icon
                onPress = { this.hide }
                type = { 'material-community' }
                name = { 'close' }
                color = { eGobie.EGOBIE_RED }
              />
            </View>
          </View>
          <View style = {{
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Kohana
              label = { 'Username' }
              iconName = { 'account' }
              onChangeText = { (text) => { this.signUpForm.username = text; } }
              { ...this.inputDefaultProps }
            />
            <Kohana
              secureTextEntry
              iconName = { 'key-variant' }
              label = { 'Password' }
              onChangeText = { (text) => { this.signUpForm.password1 = text; } }
              { ...this.inputDefaultProps }
            />
            <Kohana
              secureTextEntry
              label = { 'Confirm Password' }
              iconName = { 'lock' }
              onChangeText = { (text) => { this.signUpForm.password2 = text; } }
              { ...this.inputDefaultProps }
            />
            <Kohana
              label = { 'Full Name' }
              iconName = { 'account' }
              onChangeText = { (text) => { this.signUpForm.email = text; } }
              { ...this.inputDefaultProps }
            />
            <Kohana
              label = { 'Email' }
              iconName = { 'email' }
              onChangeText = { (text) => { this.signUpForm.fullname = text; } }
              { ...this.inputDefaultProps }
            />
            <Kohana
              label = { 'Phone' }
              iconName = { 'phone' }
              onChangeText = { (text) => { this.signUpForm.phoneNumber = text; } }
              { ...this.inputDefaultProps }
            />
          </View>
          <Button
            onPress = { this.signUp }
            title = 'CREATE NEW ACCOUNT'
            backgroundColor = { eGobie.EGOBIE_BLUE }
            buttonStyle = {{
              width: this.defaultWidth,
              marginBottom: 10,
              ...BoxShadow,
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Modal visible = { this.state.visible } >
        <View style = {{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          <Animated.View style = {{
            height: Dimension.height * 0.75,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              { scale: this.state.scale },
            ],
          }}>
            <FlipCard
              flip = { this.state.flip }
              friction = { 15 }
              perspective = { 2000 }
              flipHorizontal = { true }
              flipVertical = { false }
              clickable = { false }
              alignWidth = { true }
              alignHeight = { true }
              style = {{
                borderWidth: 0,
              }}
            >
              { this.state.visible && this.signInSide() }
              { this.state.visible && this.signUpSide() }
            </FlipCard>
          </Animated.View>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
    signedIn: state.user.signedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (username, password) => {
      dispatch({
        type: UserAction.USER_SIGN_IN,
        username,
        password,
      });
    },
    hideSign: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    },
    showResetPassword: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_RESET_PASSWORD,
      });
    },
    showErrorMessage: (error) => {
      dispatch({
        type: ErrorAction.ERROR_SHOW,
        error,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignModal);