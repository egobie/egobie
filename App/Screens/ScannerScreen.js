import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';
import Camera from 'react-native-camera';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ErrorAction from '../Actions/ErrorAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


const mask = {
  flex: 1,
  opacity: 0.7,
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
    this.props.showErrorMessage(data);
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

  renderViewFinder() {
    return (
      <View style = {{
        position: 'absolute',
        width: Dimensions.width,
        height: Dimensions.height,
      }}>
        <View style = { mask } />

        <View style = {{ flexDirection: 'row' }} >
          <View style = { mask} />
          <View style = {{
            width: Dimensions.width * 0.7,
            height: Dimensions.width * 0.7,
            borderWidth: 1,
            borderColor: eGobie.EGOBIE_SHADOW,
          }}></View>

          <View style = { mask } />
        </View>
        <View style = { mask } />
      </View>
    );
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
      }}>
        <Camera
          aspect = { Camera.constants.Aspect.fill }
          orientation = { Camera.constants.Orientation.portrait }
          onBarCodeRead = { this.onBarCodeRead }
          style = {{
            width: Dimensions.width,
            height: Dimensions.height,
          }}
        />
        { this.renderViewFinder() }
        { this.renderCancelButton() }
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
