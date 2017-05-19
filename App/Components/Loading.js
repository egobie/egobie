import React, { Component } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class Loading extends Component {
  state = {
    visible: false,
    zIndex: -1,
  };

  constructor(props) {
    super(props);
  }

  show() {
    this.setState({
      visible: true,
      zIndex: 3,
    });
  }

  hide() {
    this.setState({
      visible: false,
      zIndex: -1,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.show();
    } else {
      this.hide();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }

  render() {
    return (
      <View style = {{
        flex: 1,
        position: 'absolute',
        width: Dimensions.width,
        height: Dimensions.height,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: this.state.zIndex,
      }}>
        <ActivityIndicator
          style={{
            flex: 1,
          }}
          color = { eGobie.EGOBIE_WHITE }
          size = { 'large' } />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading || state.vehicle.loading || state.service.loading || state.resetPassword.loading,
  };
};

export default connect(mapStateToProps, null)(Loading);

