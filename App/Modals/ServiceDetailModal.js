import React, { Component } from 'react';
import { View, ScrollView, Animated, Modal, Easing } from 'react-native';
import { connect } from 'react-redux';

import { PricingCard } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class ServiceDetailModal extends Component {
  state = {
    visible: false,
    selected: null,
    pickerScale: new Animated.Value(0.85),
    options: [
      { key: '1', label: '1', },
      { key: '2', label: '2', },
      { key: '3', label: '3', },
      { key: '4', label: '4', },
    ],
  };

  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({ visible: true });
  }

  hide = () => {
    this.props.hidePicker();
    this.resetState();
  }

  scrollList = () => {
    return this.state.options.map((option, i) => {
      return (
        <CheckBox
          key = { i }
          title = { option.label }
          checked = { option.key === this.state.selected }
        />
      );
    });
  }

  resetState = () => {
    this.setState({
      visible: false,
      selected: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_SERVICE_DETAIL:
        this.show();
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
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
          backgroundColor: eGobie.EGOBIE_SHADOW,
        }}>
          <PricingCard
            color = { eGobie.EGOBIE_BLUE }
            title = { 'Premium Plus' }
            price = { '$45.00' }
            info = { ['1', '2', '3', '4'] }
            button = {{
              title: 'Confirm',
            }}
          />
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
    hidePicker: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailModal);

