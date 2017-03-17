import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, StyleSheet, Easing, TouchableWithoutFeedback } from 'react-native';

import { ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

import eGobie from '../Styles/Egobie';


class Service extends Component {
  dimension = Dimensions.get('window');
  animation = {
    translateX: new Animated.Value(0 - this.dimension.width),
  };
  state = {
    selected: false,
    color: eGobie.EGOBIE_BLACK,
    iconColor: eGobie.EGOBIE_BLUE,
    backgroundColor: eGobie.EGOBIE_WHITE,
  };

  constructor(props) {
    super(props);
    this.onPress = this._onPress.bind(this);
  }

  serviceIcon(type) {
    return {
      type: 'material-community',
      name: type === 'car-wash' ? 'car-wash' : 'oil',
      style: {
        color: this.state.iconColor,
        fontSize: 35,
        marginRight: 15,
      }
    };
  }

  show() {
    Animated.timing(this.animation.translateX, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      delay: this.props.delay,
    }).start();
  }

  hide() {
    Animated.timing(this.animation.translateX, {
      toValue: 0 - this.dimension.width,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      delay: this.props.delay,
    }).start();
  }

  componentDidMount() {
    this.show();
  }

  _onPress() {
    let selected = this.state.selected;
    this.setState({
      selected: !selected,
      backgroundColor: !selected ? eGobie.EGOBIE_BLACK: eGobie.EGOBIE_WHITE,
      color: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLACK,
      iconColor: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLUE,
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress = { this.onPress }
        onLongPress = { () => {} }
      >
        <Animated.View style = {{
          backgroundColor: this.state.backgroundColor,
          transform: [
            { translateX: this.animation.translateX },
          ],
        }}>
          <ListItem
            hideChevron
            title = { this.props.title }
            titleStyle = {{
              color: this.state.color,
              fontWeight: '600',
            }}
            subtitle = { `Estimated Time: ${this.props.time}min` }
            subtitleStyle = {{
              color: this.state.color,
              fontWeight: '300',
            }}
            rightTitle = { `$${this.props.price}` }
            rightTitleStyle = {{
              color: this.state.color,
              fontWeight: '600',
            }}
            leftIcon = { this.serviceIcon(this.props.type) }
            containerStyle = {{
              height: 70,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: eGobie.EGOBIE_GREY,
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

Service.propTypes = {
  id: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
  price: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  // Used for animation
  delay: React.PropTypes.number,
};

Service.defaultProps = {
  delay: 0,
};

export default Service;
