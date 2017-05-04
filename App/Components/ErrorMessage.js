import React, { Component } from 'react';
import { View, Animated, Text, Easing } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import * as ErrorAction from '../Actions/ErrorAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class ErrorMessage extends Component {
  state = {
    top: new Animated.Value(-70),
    errorMessage: null,
  };
  timer = null;

  constructor(props) {
    super(props);
  }

  show(errorMessage) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.hide();
    }, 2000);

    this.setState({
      errorMessage,
    });
    Animated.timing(this.state.top, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  hide() {
    this.props.hideError();
    Animated.timing(this.state.top, {
      toValue: -70,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.show(nextProps.error);
    } else {
      this.setState({
        errorMessage: null,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.error !== this.state.errorMessage;
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        height: 70,
        width: Dimensions.width,
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        backgroundColor: eGobie.EGOBIE_RED,
        top: this.state.top,
        zIndex: 4,
      }}>
        {
          this.state.errorMessage && <Text style = {{
            color: eGobie.EGOBIE_WHITE,
          }}>{ this.state.errorMessage }</Text>
        }
      </Animated.View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.error.message,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideError: () => {
      dispatch({
        type: ErrorAction.ERROR_HIDE,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
