import React, { Component } from 'react';
import { View, ScrollView, Animated, Modal, Easing } from 'react-native';
import { connect } from 'react-redux';

import { PricingCard } from 'react-native-elements';

import * as ServiceAction from '../Actions/ServiceAction';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class ServiceDetailModal extends Component {
  state = {
    visible: false,
    selected: null,
    pickerScale: new Animated.Value(0.85),
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({ visible: true });
  }

  hide = () => {
    this.props.hideServiceDetail();
    this.resetState();
  }

  resetState = () => {
    this.setState({
      visible: false,
      selected: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.service) {
      this.show();
    } else {
      this.hide();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible && nextProps.service !== this.props.service;
  }

  render() {
    let { service } = this.props;

    return (
      <Modal
        transparent
        onRequestClose = { () => {} }
        animationType = { 'slide' }
        visible = { this.state.visible }
      >
        <View style = {{
          flex: 1,
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          {
            service && <PricingCard
              color = { eGobie.EGOBIE_BLUE }
              title = { service.name }
              price = { `$${service.price}.00` }
              info = { service.items }
              button = {{
                title: 'CLOSE',
                icon: 'close',
              }}
              onButtonPress = { this.hide }
            />
          }
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    service: state.service.detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideServiceDetail: () => {
      dispatch({
        type: ServiceAction.SERVICE_HIDE,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailModal);

