import React, { Component } from 'react';
import { Modal, View, Text, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { Button, Icon, SocialIcon } from 'react-native-elements';
import { Kohana } from 'react-native-textinput-effects';
import FlipCard from 'react-native-flip-card'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Dimension from '../Libs/Dimension';
import BoxShadow from '../Styles/BoxShadow';
import eGobie from '../Styles/Egobie';


class SignModal extends Component {
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
  animation = {
    
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
    Animated.timing(this.state.scale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.resetState();
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

  signIn() {
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
              { ...this.inputDefaultProps }
            />
            <Kohana
              secureTextEntry
              label = { 'Password' }
              iconName = { 'lock' }
              { ...this.inputDefaultProps }
            />
          </View>
          <Button
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

  signUp() {
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
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Kohana
              label = { 'Username' }
              iconName = { 'account' }
              { ...this.inputDefaultProps }
            />
            <Kohana
              secureTextEntry
              label = { 'Password' }
              { ...this.inputDefaultProps }
              iconName = { 'key-variant' }
            />
            <Kohana
              secureTextEntry
              label = { 'Confirm Password' }
              iconName = { 'lock' }
              { ...this.inputDefaultProps }
            />
            <Kohana
              label = { 'Email' }
              { ...this.inputDefaultProps }
              iconName = { 'email' }
            />
          </View>
          <Button
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
      <Modal
        transparent
        visible = { this.state.visible }
      >
        <Animated.View style = {{
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
              { this.signIn() }
              { this.signUp() }
            </FlipCard>
          </Animated.View>
        </Animated.View>
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
    hideSign: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignModal);