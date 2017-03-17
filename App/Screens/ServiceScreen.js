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
  animation = {
    top: new Animated.Value(Dimension.height),
    scale: new Animated.Value(0.8),
    topDistance: new Animated.Value(0),
    height: new Animated.Value(0),
    rotate: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.show = this._show.bind(this);
    this.hide = this._hide.bind(this);
    this.focus = this._focus.bind(this);
    this.blur = this._blur.bind(this);
    this.toogle = this._toogle.bind(this);
  }

  _focus() {
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

  _blur() {
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

  _show() {
    Animated.timing(this.animation.top, {
      toValue: Dimension.height - 80,
      easing: Easing.out(Easing.cubic),
      delay: 500,
    }).start();
  }

  _hide() {
    Animated.timing(this.animation.top, {
      toValue: Dimension.height,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  _toogle() {
    this.state.showed ? this.blur() : this.focus();
  }

  componentDidMount() {
    this.show();
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
          this.props.services.map((_, key) => {
            return (
              <Service
                key = { key }
                id = { 1 }
                type = ''
                title = 'Premium'
                time = '30'
                price = '999.99'
                onPress = { (id, selected) => { this.props.onServicePress(id, selected) } }
                onLongPress = { (id) => { this.props.onServiceLongPress(id) } }
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
  onServicePress: React.PropTypes.func.isRequired,
  onServiceLongPress: React.PropTypes.func.isRequired,
};

ServiceScreen.defaultProps = {
  services: [],
};

export default ServiceScreen;
