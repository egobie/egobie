import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Service from '../Components/Service';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class ServiceScreen extends Component {
  focused = false;
  state = {
    top: new Animated.Value(Dimension.height),
    scale: new Animated.Value(0.8),
    topDistance: new Animated.Value(0),
    height: new Animated.Value(0),
    rotate: new Animated.Value(0),
    services: [],
  };

  constructor(props) {
    super(props);
  }

  focus = () => {
    this.focused = true;
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.scale, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.height, {
        toValue: Dimension.height - 50,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.rotate, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.topDistance, {
        toValue: 15,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }

  blur = () => {
    this.focused = false;
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: Dimension.height - 80,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.scale, {
        toValue: 0.80,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.height, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.rotate, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.topDistance, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }

  show = () => {
    Animated.timing(this.state.top, {
      toValue: Dimension.height - 80,
      easing: Easing.out(Easing.cubic),
      delay: 500,
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.top, {
      toValue: Dimension.height,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  toogle = () => {
    if (this.focused) {
      this.blur();

      if (this.props.workflow !== WorkflowAction.WORK_FLOW_START && this.props.workflow !== WorkflowAction.WORK_FLOW_LOCATION) {
        this.props.changeWorkflow(WorkflowAction.WORK_FLOW_BACK);
      }
    } else {
      this.show();
      this.focus();
    }
  }

  componentDidMount() {
    this.show();
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_START:
      case WorkflowAction.WORK_FLOW_LOCATION:
        this.show();
        this.blur();
        break;

      case WorkflowAction.WORK_FLOW_ORDER:
        this.hide();
        break;

      case WorkflowAction.WORK_FLOW_SERVICE:
        this.focus();
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.workflow === this.props.workflow) {
      return false;
    }

    switch(nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_START:
      case WorkflowAction.WORK_FLOW_LOCATION:
      case WorkflowAction.WORK_FLOW_ORDER:
      case WorkflowAction.WORK_FLOW_SERVICE:
        return true;
    }

    return false;
  }

  renderBanner() {
    return (
      <TouchableWithoutFeedback onPress = { this.toogle }>
      <View style = {{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: eGobie.EGOBIE_BLUE,
      }}>
        <Animated.Text style = {{
          flex: 1,
          fontSize: 15,
          paddingLeft: 15,
          paddingTop: this.state.topDistance,
          color: eGobie.EGOBIE_WHITE,
        }}> eGobie Services </Animated.Text>
          <Animated.View style = {{
            height: 30,
            width: 30,
            marginRight: 10,
            marginTop: this.state.topDistance,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              { rotate: this.state.rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          }}>
            <Icon
              type = { 'material-community' }
              name = { 'chevron-up' }
              iconStyle = {{
                color: eGobie.EGOBIE_WHITE,
              }}
            />
          </Animated.View>
      </View>
      </TouchableWithoutFeedback>
    );
  }

  renderList() {
    return (
      <Animated.View style = {{
        height: this.state.height,
      }}>
        <ScrollView showsVerticalScrollIndicator = { false } >
        {
          this.props.services.map((service, key) => {
            return (
              <Service
                key = { key }
                id = { service.id }
                type = { service.type.toLowerCase() }
                title = { service.name }
                time = { service.time }
                price = { service.price }
              />
            );
          })
        }
        </ScrollView>
      </Animated.View>
    );
  }

  renderSelected() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        left: 0,
        right: 0,
        top: -60,
      }}>
        <Icon
          type = { 'material-community' }
          name = { 'car-wash' }
          iconStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 40,
            marginRight: 20,
          }}
        />
        <Icon
          type = { 'material-community' }
          name = { 'oil' }
          iconStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 50,
            marginLeft: 20,
          }}
        />
      </Animated.View>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        top: this.state.top,
        width: Dimension.width,
        backgroundColor: eGobie.EGOBIE_WHITE,
        transform: [
          { scale: this.state.scale },
        ],
        ...BoxShadow,
      }}>
        { this.renderBanner() }
        { this.renderList() }
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.metadata.services,
    workflow: state.workflow.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeWorkflow: (type) => {
      dispatch({
        type,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScreen);
