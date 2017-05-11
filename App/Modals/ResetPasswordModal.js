import React, { Component } from 'react';
import { View, ScrollView, Animated, Modal, Easing } from 'react-native';
import { connect } from 'react-redux';

import { Kohana } from 'react-native-textinput-effects';
import { Button, Icon } from 'react-native-elements';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ErrorAction from '../Actions/ErrorAction';
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
    this.setState({
      visible: false,
    });
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
        <View style = {{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Kohana
            label = { 'Please input your Email' }
            iconName = { 'email' }
            onChangeText = { () => { } }
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
        <View style = {{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Kohana
            label = { 'Please input the token' }
            iconName = { 'lock' }
            onChangeText = { () => { } }
            { ...this.inputDefaultProps }
          />
        </View>
        <View style = {{
          flexDirection: 'row',
          alignItems: 'center',
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
        <View style = {{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}>
          <Kohana
            label = { 'New Password' }
            iconName = { 'key-variant' }
            onChangeText = { () => { } }
            { ...this.inputDefaultProps }
          />
          <Kohana
            label = { 'Confirm New Password' }
            iconName = { 'lock' }
            onChangeText = { () => { } }
            { ...this.inputDefaultProps }
          />
        </View>
        <Button
          title = 'RESET PASSWORD'
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

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_RESET_PASSWORD:
        this.show();
    }
  }

  render() {
    return (
      <Modal
        transparent
        animationType = { 'slide' }
        visible = { this.state.visible }
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

