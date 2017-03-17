import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import { Icon } from 'react-native-elements';

import Service from '../Components/Service';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class ServiceScreen extends Component {
  state = {
    showed: false,
  };

  services = [];
  animation = {
    top: new Animated.Value(Dimension.height),
    scale: new Animated.Value(0.8),
    topDistance: new Animated.Value(0),
    height: new Animated.Value(0),
    rotate: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  hide() {
    this.services.forEach((service) => {
      service.hide();
    });
  }

  show() {
    this.services.forEach((service) => {
      service.show();
    });
  }

  showScreen() {
    Animated.parallel([
      Animated.timing(this.animation.top, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.height, {
        toValue: Dimension.height - 50,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.rotate, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.topDistance, {
        toValue: 15,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start(() => {
      this.setState({
        showed: true,
      });
    });
  }

  hideScreen() {
    Animated.parallel([
      Animated.timing(this.animation.top, {
        toValue: Dimension.height - 80,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 0.80,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.height, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.rotate, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.topDistance, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start(() => {
      this.setState({
        showed: false,
      });
    });
  }

  componentDidMount() {
    Animated.timing(this.animation.top, {
      toValue: Dimension.height - 80,
      easing: Easing.out(Easing.cubic),
      delay: 500,
    }).start();
  }

  toogleScreen() {
    this.state.showed ? this.hideScreen() : this.showScreen();
  }

  renderBanner() {
    return (
      <TouchableWithoutFeedback onPress = { this.toogleScreen.bind(this) }>
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
          paddingTop: this.animation.topDistance,
          color: eGobie.EGOBIE_WHITE,
        }}> eGobie Services </Animated.Text>
          <Animated.View style = {{
            height: 30,
            width: 30,
            marginRight: 10,
            marginTop: this.animation.topDistance,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              { rotate: this.animation.rotate.interpolate({
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
        height: this.animation.height,
      }}>
        <ScrollView
          showsVerticalScrollIndicator = { false }
        >
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) => {
            return (
              <Service
                ref = { (service) => { this.services.push(service) } }
                id = { 1 }
                type = ''
                title = 'Premium'
                time = '30'
                price = '999.99'
                key = { key }
                onClick = { this.props.onServiceSelect }
                delay = { key * 50 }
              />
            );
          })
        }
        </ScrollView>
      </Animated.View>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        top: this.animation.top,
        width: Dimension.width,
        backgroundColor: eGobie.EGOBIE_WHITE,
        transform: [
          { scale: this.animation.scale },
        ],
        ...BoxShadow,
      }}>
        { this.renderBanner() }
        { this.renderList() }
      </Animated.View>
    );
  }
}

ServiceScreen.propTypes = {
  services: React.PropTypes.array.isRequired,
  onServiceSelect: React.PropTypes.func.isRequired,
};

 export default ServiceScreen;
 