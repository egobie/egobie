import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Reactotron from 'reactotron-react-native'
import { Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class Nav extends Component {
  state = {
    showed: true,
    top: new Animated.Value(20),
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({
      showed: true,
    });
    Animated.timing(this.state.top, {
      toValue: 20,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  hide = () => {
    this.setState({
      showed: false,
    });
    Animated.timing(this.state.top, {
      toValue: -50,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  showScanner = () => {
    this.props.showScanner();
  }

  showSign = () => {
    this.props.showSign();
  }

  componentWillReceiveProps(nextProps) {
    switch(nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_ORDER:
        this.hide();
        break;

      case WorkflowAction.WORK_FLOW_LOCATION:
        this.show();
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.userId !== this.props.userId || nextState.showed !== this.state.showed;
  }

  renderUserIcon() {``
    if (this.props.userId === -1) {
      return (
        <TouchableWithoutFeedback onPress = { this.showSign }>
          <View style = {{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            left: 15,
          }}>
            <Icon
              name = { 'account' }
              type = { 'material-community' }
              color = { eGobie.EGOBIE_BLACK }
              size = { 28 }
            />
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress = { () => {} }>
          <View style = {{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            left: 15,
          }}>
            <Icon
              name = { 'menu' }
              type = { 'material-community' }
              color = { eGobie.EGOBIE_BLACK }
              size = { 28 }
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderScannerIcon() {
    return (
      <TouchableWithoutFeedback onPress = { this.showScanner } >
        <View style = {{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,
          right: 15,
        }}>
          <Icon
            name = { 'qrcode-scan' }
            type = { 'material-community' }
            color = { eGobie.EGOBIE_BLACK } />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        height: 50,
        width: Dimensions.width,
        top: this.state.top,
      }}>
        { this.renderUserIcon() }
        { this.renderScannerIcon() }
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
    userId: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showScanner: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_SCANNER,
      });
    },
    showSign: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_SIGN,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
