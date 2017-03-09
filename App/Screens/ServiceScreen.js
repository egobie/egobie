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
    top: new Animated.Value(Dimension.height - 180),
    scale: new Animated.Value(0.8),
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
        toValue: Dimension.height - 380,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 0.95,
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
        toValue: Dimension.height - 180,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 0.80,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start(() => {
      this.setState({
        showed: false,
      });
    });
  }

  toogleScreen() {
    this.state.showed ? this.hideScreen() : this.showScreen();
  }

  renderBanner() {
    return (
      <View style = {{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: eGobie.EGOBIE_BLUE,
      }}>
        <Text style = {{
          flex: 1,
          fontSize: 15,
          paddingLeft: 15,
          color: eGobie.EGOBIE_WHITE,
        }}> eGobie Services </Text>
        <TouchableWithoutFeedback onPress = { this.toogleScreen.bind(this) }>
          <View style = {{
            height: 30,
            width: 30,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {
              !this.state.showed && <Icon
                type = { 'material-community' }
                name = { 'chevron-up' }
                iconStyle = {{
                  color: eGobie.EGOBIE_WHITE,
                }}
              />
            }
            {
              this.state.showed && <Icon
                type = { 'material-community' }
                name = { 'chevron-down' }
                iconStyle = {{
                  color: eGobie.EGOBIE_WHITE,
                }}
              />
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderList() {
    return (
      <ScrollView
        showsVerticalScrollIndicator = { false }
        style = {{
          height: 200,
          marginTop: 5,
          marginBottom: 10,
        }}
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
 