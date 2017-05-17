import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';
import Camera from 'react-native-camera';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ErrorAction from '../Actions/ErrorAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


const mask = {
  flex: 1,
  backgroundColor: 'transparent',
};

class ScannerScreen extends Component {
  state = {
    top: new Animated.Value(Dimensions.height),
    barCodeReaded: false,
  };

  constructor(props) {
    super(props);
  }

  onBarCodeRead = (data, bounds) => {
    if (this.state.barCodeReaded) {
      return;
    }

    this.setState({
      barCodeReaded: true,
    });
    this.props.showErrorMessage(data.data);
  }

  cancel = () => {
    this.hide();
    this.props.hideScanner();
  }

  show = () => {
    Animated.timing(this.state.top, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.top, {
      toValue: Dimensions.height,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.setState({
        barCodeReaded: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    switch(nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_SCANNER:
        this.show();
        break;
    }
  }

  renderCancelButton() {
    return (
      <TouchableWithoutFeedback onPress = { this.cancel }>
      <View style = {{
        position: 'absolute',
        width: 50,
        height: 50,
        left: Dimensions.width / 2 - 25,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
      }}>
        <Icon
          reverse
          name = { 'close' }
          type = { 'material-community' }
          color = { eGobie.EGOBIE_GREY }
          size = { 25 }
        />
      </View>
      </TouchableWithoutFeedback>
    );
  }

  renderViewFinder() {
    return (
      <View style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
        <View style = {{
          width: Dimensions.width * 0.7,
          height: Dimensions.width * 0.7,
          borderWidth: 1,
          borderColor: eGobie.EGOBIE_SHADOW,
        }}/>
        <View style = {{
          height: 50,
        }}>
          <Text style = {{
            height: 50,
            lineHeight: 50,
            textAlign: 'center',
            color: eGobie.EGOBIE_GREY,
            backgroundColor: 'transparent',
          }}>Align QR Code withing frame to scan</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.width,
        height: Dimensions.height,
        top: this.state.top,
        borderColor: 'blue',
        borderWidth: 10,
      }}>
        <Camera
          aspect = { Camera.constants.Aspect.fill }
          orientation = { Camera.constants.Orientation.portrait }
          onBarCodeRead = { this.onBarCodeRead }
          style = {{
            width: Dimensions.width,
            height: Dimensions.height,
          }}
        >
          { this.renderViewFinder() }
          { this.renderCancelButton() }
        </Camera>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideScanner: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    },
    showErrorMessage: (error) => {
      dispatch({
        type: ErrorAction.ERROR_SHOW,
        error,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);
