import React, { Component } from 'react';
import { View, Animated, Text, Easing } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import * as MessageAction from '../Actions/MessageAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class Message extends Component {
  state = {
    top: new Animated.Value(-70),
    message: null,
    type: null,
  };
  timer = null;

  constructor(props) {
    super(props);
  }

  show(message, type) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.hide();
    }, 2500);

    this.setState({
      message, type,
    });
    Animated.timing(this.state.top, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  hide() {
    this.props.hideMessage();
    Animated.timing(this.state.top, {
      toValue: -70,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.show(nextProps.message, nextProps.type);
    } else {
      this.setState({
        message: null,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.message !== this.state.message;
  }

  render() {
    let { type } = this.state;
    let backgroundColor = eGobie.EGOBIE_RED;

    if (type === 'success') {
      backgroundColor = eGobie.EGOBIE_GREEN;
    }

    return (
      <Animated.View style = {{
        position: 'absolute',
        height: 70,
        width: Dimensions.width,
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        backgroundColor: backgroundColor,
        top: this.state.top,
        zIndex: 4,
      }}>
        {
          this.state.message && <Text style = {{
            color: eGobie.EGOBIE_WHITE,
          }}>{ this.state.message }</Text>
        }
      </Animated.View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.message.context,
    type: state.message.type,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideMessage: () => {
      dispatch({
        type: MessageAction.MESSAGE_HIDE,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
