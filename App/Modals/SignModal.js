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
import ErrorMessage from '../Components/ErrorMessage';
import Modal from '../Components/Modal';
import Dimension from '../Libs/Dimension';
import BoxShadow from '../Styles/BoxShadow';
import eGobie from '../Styles/Egobie';
import * as Validator from '../Libs/Validator';


class SignModal extends Component {
  showed = false;
  state = {
    scale: new Animated.Value(0),
    flip: false,
    visible: false,
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

  errorMessage = null;

  signInForm = {
    username: '',
    password: '',
  };

  signUpForm = {
    username: '',
    password1: '',
    password2: '',
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

  show = () => {
    if (this.showed) {
      return;
    }

    this.showed = true;
    this.setState({ visible: true });
    setTimeout(() => {
      Animated.spring(this.state.scale, {
        toValue: 1,
        friction: 4,
        tension: 40,
      }).start();
    }, 100);
  }

  hide = () => {
    if (!this.showed) {
      return;
    }

    Animated.timing(this.state.scale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.resetState();
      this.showed = false;
    });
  }

  resetState = () => {
    this.setState({
      flip: false,
      visible: false,
    });
  }

  hideSign = () => {
    this.props.hideSign();
  }

  componentWillReceiveProps(nextProps) {
    switch(nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_SIGN:
        this.show();
        break;

      default:
        this.hide();
        break;
    }
  }

  signIn = () => {
    if (this.signInForm.username.length === 0) {
      this.errorMessage.show('Please input username');
      return;
    }

    if (this.signInForm.password.length === 0) {
      this.errorMessage.show('Please input password');
      return;
    }

    this.props.signIn(this.signInForm.username, this.signInForm.password);
  }

  signUp = () => {
    if (this.signUpForm.username.length === 0) {
      this.errorMessage.show('Please input username');
      return;
    }

    if (this.signUpForm.username.length < 5 || this.signUpForm.username.length > 16) {
      this.errorMessage.show('Username must be 5 - 16 characters');
      return;
    }

    if (this.signUpForm.password1.length === 0) {
      this.errorMessage.show('Please input password');
      return;
    }

    if (this.signUpForm.password1.length < 8 || this.signUpForm.password1.length > 20) {
      this.errorMessage.show('Password must be 8 - 20 characters');
      return;
    }

    if (this.signUpForm.password1 !== this.signUpForm.password2) {
      this.errorMessage.show('Password does not match');
      return;
    }

    if (!Validator.validateEmail(this.signUpForm.email)) {
      this.errorMessage.show('Please input valid Email');
      return;
    }

    if (!Validator.validatePhone(this.signUpForm.phoneNumber)) {
      this.errorMessage.show('Please input valid phone number');
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
          <TouchableWithoutFeedback onPress = { this.hideSign } >
            <View style = {{
              width: this.defaultWidth,
              height: 30,
              marginTop: 15,
              alignItems: 'flex-end',
            }}>
              <Icon
                type = { 'material-community' }
                name = { 'close' }
                color = { eGobie.EGOBIE_RED }
              />
            </View>
          </TouchableWithoutFeedback>
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
            <Text style = {{
              flex: 3,
              fontSize: 12,
              lineHeight: 30,
              textAlign: 'left',
              color: eGobie.EGOBIE_BLUE,
            }}>
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
            <TouchableWithoutFeedback onPress = { this.hideSign } >
              <View style = {{
                flex: 1,
                alignItems: 'flex-end',
              }}>
                <Icon
                  type = { 'material-community' }
                  name = { 'close' }
                  color = { '#E04329' }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style = {{
            height: 250,
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
              label = { 'Email' }
              iconName = { 'email' }
              onChangeText = { (text) => { this.signUpForm.email = text; } }
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
          <ErrorMessage ref = { (ref) => { this.errorMessage = ref; } }/>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignModal);