import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { Kohana } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ErrorAction from '../Actions/ErrorAction';
import Modal from '../Components/Modal';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class ResetPasswordModal extends Component {
  width = Dimension.width * 0.8;
  height = Dimension.height * 0.5;
  scrollView = null;
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
  state = {
    visible: false,
    email: null,
    token: null,
    password1: null,
    password2: null,
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({
      visible: true,
    });
  }

  hide = () => {
    this.props.hideResetPassword();
    this.resetState();
  }

  resetState = () => {
    this.setState({
      visible: false,
      email: null,
      token: null,
      password1: null,
      password2: null,
    });
    setTimeout(() => {
      this.scrollView.scrollTo({
        x: 0,
      });
    }, 1000);
  }

  renderStep1() {
    return (
      <Animated.View style = {{
        height: this.height,
        width: this.width,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <Text style = {{
          textAlign: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          marginTop: -50,
          fontSize: 12,
          color: eGobie.EGOBIE_BLACK,
        }}>
          Please enter your email address below and we'll email
          you with security token to reset your password
        </Text>
        <View style = {{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Kohana
            label = { 'Email Address' }
            iconName = { 'email' }
            value = { this.state.email }
            onChangeText = {(text) => {
              this.setState({
                email: text,
              });
            }}
            { ...this.inputDefaultProps }
          />
        </View>
        <Button
          title = 'SEND TOKEN'
          onPress = { () => {
            this.scrollView.scrollTo({
              x: this.width,
              animated: true,
            });
          } }
          backgroundColor = { eGobie.EGOBIE_BLUE }
          buttonStyle = {{
            marginBottom: 10,
            ...BoxShadow,
          }}
        />
      </Animated.View>
    );
  }

  renderStep2() {
    return (
      <Animated.View style = {{
        height: this.height,
        width: this.width,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <Text style = {{
          textAlign: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          marginTop: -50,
          fontSize: 12,
          color: eGobie.EGOBIE_BLACK,
        }}>
          We sent you an email with security token for resetting
          your password
        </Text>
        <View style = {{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Kohana
            label = { 'Security Token' }
            iconName = { 'lock' }
            value = { this.state.token }
            onChangeText = {(text) => {
              this.setState({
                token: text,
              });
            }}
            { ...this.inputDefaultProps }
          />
        </View>
        <View style = {{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button
            onPress = { () => {
              this.scrollView.scrollTo({
                x: 0,
                animated: true,
              });
            } }
            icon = {{
              name: 'chevron-left',
              type: 'material-community',
              color: eGobie.EGOBIE_WHITE,
            }}
            buttonStyle = {{
              height: 40,
              backgroundColor: eGobie.EGOBIE_BLUE,
              ...BoxShadow,
            }}
          />
          <Button
            title = 'VALIDATE TOKEN'
            onPress = { () => {
              this.scrollView.scrollTo({
                x: this.width * 2,
                animated: true,
              });
            } }
            buttonStyle = {{
              height: 40,
              backgroundColor: eGobie.EGOBIE_BLUE,
              ...BoxShadow,
            }}
          />
        </View>
      </Animated.View>
    );
  }

  renderStep3() {
    return (
      <Animated.View style = {{
        height: this.height,
        width: this.width,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <Text style = {{
          textAlign: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          marginTop: -50,
          fontSize: 12,
          color: eGobie.EGOBIE_BLACK,
        }}>
          Please enter new password
        </Text>
        <View style = {{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Kohana
            secureTextEntry
            label = { 'New Password' }
            iconName = { 'key-variant' }
            value = { this.state.password1 }
            onChangeText = {(text) => {
              this.setState({
                password1: text,
              });
            }}
            { ...this.inputDefaultProps }
          />
          <Kohana
            secureTextEntry
            label = { 'Confirm New Password' }
            iconName = { 'lock' }
            value = { this.state.password2 }
            onChangeText = {(text) => {
              this.setState({
                password2: text,
              });
            }}
            { ...this.inputDefaultProps }
          />
        </View>
        <Button
          title = 'RESET PASSWORD'
          onPress = { () => {
            this.scrollView.scrollTo({
              x: this.width * 3,
              animated: true,
            });
          } }
          backgroundColor = { eGobie.EGOBIE_BLUE }
          buttonStyle = {{
            marginBottom: 10,
            ...BoxShadow,
          }}
        />
      </Animated.View>
    );
  }

  renderStep4() {
    return (
      <Animated.View style = {{
        height: this.height,
        width: this.width,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <View style = {{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Icon
            type = { 'material-community' }
            name = { 'check' }
            color = { eGobie.EGOBIE_GREEN }
            size = { 50 }
          />
        </View>
        <Text style = {{
          textAlign: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 40,
          marginTop: -30,
          fontSize: 14,
          color: eGobie.EGOBIE_GREEN,
        }}>
          Password reset successfully
        </Text>
        <Button
          title = 'OK'
          onPress = { () => {
            this.hide();
          } }
          backgroundColor = { eGobie.EGOBIE_BLUE }
          buttonStyle = {{
            marginBottom: 10,
            ...BoxShadow,
          }}
        />
      </Animated.View>
    );
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_RESET_PASSWORD:
        this.show();
    }
  }

  render() {
    return (
      <Modal
        visible = { this.state.visible }
        animated = { true }
      >
        <View style = {{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          <View style = {{
            height: 30,
            width: this.width,
            paddingRight: 15,
            paddingTop: 15,
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: eGobie.EGOBIE_WHITE,
          }}>
            <Icon
              onPress = { this.hide }
              type = { 'material-community' }
              name = { 'close' }
              color = { eGobie.EGOBIE_RED }
            />
          </View>
          <View style = {{
            width: this.width,
            height: this.height,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <ScrollView
              ref = { (ref) => { this.scrollView = ref; } }
              horizontal = { true }
              scrollEnabled = { false }
            >
              { this.renderStep1() }
              { this.renderStep2() }
              { this.renderStep3() }
              { this.renderStep4() }
            </ScrollView>
          </View>
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
    hideResetPassword: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal);

