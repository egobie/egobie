import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, StyleSheet, Easing, TouchableWithoutFeedback } from 'react-native';

import { ListItem } from 'react-native-elements';

class Service extends Component {
  dimension = Dimensions.get('window');

  constructor(props) {
    super(props);
    this.state = {
      translateX: new Animated.Value(0 - this.dimension.width),
    };
  }

  serviceIcon(type) {
    return {
      type: 'material-community',
      name: type === 'car-wash' ? 'car-wash' : 'oil',
      style: {
        color: 'red',
        fontSize: 35,
        marginRight: 15,
      }
    };
  }

  show() {
    Animated.timing(this.state.translateX, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      delay: this.props.delay,
    }).start();
  }

  hide() {
    Animated.timing(this.state.translateX, {
      toValue: 0 - this.dimension.width,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      delay: this.props.delay,
    }).start();
  }

  componentWillMount() {
    this.show();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress = { () => { this.props.onClick(this.props.id) } }>
        <Animated.View style = {{
          transform: [
            { translateX: this.state.translateX },
          ],
        }}>
          <ListItem
            hideChevron
            title = { this.props.title }
            titleStyle = {{
              color: '#484E56',
              fontWeight: '600',
            }}
            subtitle = { `Estimated Time: ${this.props.time}min` }
            subtitleStyle = {{
              color: '#484E56',
              fontWeight: '300',
            }}
            rightTitle = { `$${this.props.price}` }
            rightTitleStyle = {{
              color: '#484E56',
              fontWeight: '600',
            }}
            leftIcon = { this.serviceIcon(this.props.type) }
            containerStyle = {{
              height: 70,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: '#ABB8C7',
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
