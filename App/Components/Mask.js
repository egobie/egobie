import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import * as WorkflowAction from '../Actions/WorkflowAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class Mask extends Component {
  state = {
    visible: false,
    opacity: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({
      visible: true,
    });
    Animated.timing(this.state.opacity, {
      toValue: 0.9,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.setState({
        visible: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    Reactotron.log(nextProps.workflow);
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_MENU:
        this.show();
        break;

      default:
        this.hide();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = nextState.visible !== this.state.visible;
    if (update) {
      Reactotron.log('shouldComponentUpdate - Mask');
    }
    return update;
  }

  render() {
    return (
      this.state.visible && <Animated.View style = {{
        flex: 1,
        position: 'absolute',
        width: Dimensions.width,
        height: Dimensions.height,
        backgroundColor: eGobie.EGOBIE_SHADOW,
        opacity: this.state.opacity,
      }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
  };
};

export default connect(mapStateToProps, null)(Mask);

