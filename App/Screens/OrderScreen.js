import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import Reactotron from 'reactotron-react-native';
import { Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-carousel-control';

import CreditCard from '../Components/CreditCard';
import Label from '../Components/Label';
import Dimension from '../Libs/Dimension';

const borderBottomColor = '#ABB8C7';
const leftIconColor = '#3FA6D1';

export default class extends Component {
  showedChild = '';

  constructor(props) {
    super(props);
    this.animation = {
      translateXs: [],
      translateX: new Animated.Value(0),
      scale: new Animated.Value(1),
      placeOrderOpacity: new Animated.Value(1),
      paymentTranslateY: new Animated.Value(200),
      paymentOpacity: new Animated.Value(0),
      vehicleTranslateY: new Animated.Value(200),
      vehicleOpacity: new Animated.Value(0),
    };
  }

  show() {
    let animations = [
      Animated.timing(this.animation.translateX, {
        toValue: 0 - Dimension.width,
        duration: 500,
        easing: Easing.out(Easing.cubic)
      })
    ];

    animations = animations.concat(this.animation.translateXs.map((translateX, i) => {
      return Animated.timing(this.animation.translateXs[i], {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        delay: i * 50,
      });
    }));

    Animated.parallel(animations).start();
  }

  hide() {
    let animations = this.animation.translateXs.map((translateX, i) => {
      return Animated.timing(this.animation.translateXs[i], {
        toValue: Dimension.width,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        delay: i * 30,
      });
    });
    animations = animations.concat(
      Animated.timing(this.animation.translateX, {
        toValue: Dimension.width,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        delay: this.animation.translateXs.length * 100,
      })
    );
    Animated.parallel(animations).start();
  }

  _showChild(child) {
    if (this.showedChild !== '') {
      return;
    }

    this.showedChild = child;
    Animated.parallel([
      Animated.spring(this.animation.scale, {
        toValue: 0.9,
        tension: 40,
        friction: 2,
      }),
      Animated.timing(this.animation.placeOrderOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation[`${child}Opacity`], {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(this.animation[`${child}TranslateY`], {
        toValue: 0,
        tension: 40,
        friction: 5,
      }),
    ]).start();
  }

  _hideChild(child) {
    this.showedChild = '';
    Animated.parallel([
      Animated.timing(this.animation.scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.placeOrderOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation[`${child}Opacity`], {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        delay: 50,
      }),
      Animated.spring(this.animation[`${child}TranslateY`], {
        toValue: 200,
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }

  showChild(child) {
    return this._showChild.bind(this, child);
  }

  hideChild(child) {
    return this._hideChild.bind(this, child);
  }

  rightIcon() {
    return null;
    // return {
    //   type: 'material-community',
    //   name: 'pencil',
    //   color: '#3FA6D1',
    //   style: {
    //     fontSize: 15,
    //     marginRight: 10,
    //     marginTop: 15,
    //   }
    // };
  }

  location() {
    let i = this.animation.translateXs.length;
    this.animation.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          marginBottom: 5,
          transform: [
            { translateX: this.animation.translateXs[i] },
          ],
        }}
      >
        <Label
          title = 'Location'
          value = '414 Hackensack Avenue, APT 1220'
          titleStyle = {{
            color: '#ABB8C7',
            fontSize: 12,
          }}
          valueStyle = {{
            color: '#484E56',
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'map-marker-radius',
            color: leftIconColor,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            marginLeft: 15,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor,
          }}
        />
      </Animated.View>
    );
  }

  service() {
    let i = this.animation.translateXs.length;
    this.animation.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          marginBottom: 5,
          transform: [
            { translateX: this.animation.translateXs[i] },
          ],
        }}
      >
        <Label
          title = 'Service'
          value = 'Premium'
          titleStyle = {{
            color: '#ABB8C7',
            fontSize: 12,
          }}
          valueStyle = {{
            color: '#484E56',
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'car-wash',
            color: leftIconColor,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            paddingTop: 5,
            paddingBottom: 5,
            marginLeft: 15,
            marginRight: 15,
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor,
          }}
        />
      </Animated.View>
    );
  }

  schedule() {
    let i = this.animation.translateXs.length;
    this.animation.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          marginBottom: 5,
          transform: [
            { translateX: this.animation.translateXs[i] },
          ],
        }}
      >
        <Label
          title = 'Schedule'
          value = '08/20/2016 09:00 A.M.'
          titleStyle = {{
            color: '#ABB8C7',
            fontSize: 12,
          }}
          valueStyle = {{
            color: '#484E56',
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'calendar-check',
            color: leftIconColor,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            marginLeft: 15,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor,
          }}
        />
      </Animated.View>
    );
  }

  paymentViechle() {
    let i = this.animation.translateXs.length;
    this.animation.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          flexDirection: 'row',
          marginBottom: 5,
          transform: [
            { translateX: this.animation.translateXs[i] },
          ],
        }}
      >
        <Label
          onLongPress = { this.showChild('payment') }
          title = 'Payment'
          value = '5860'
          titleStyle = {{
            color: '#ABB8C7',
            fontSize: 12,
          }}
          valueStyle = {{
            color: '#484E56',
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'font-awesome',
            name: 'cc-visa',
            color: leftIconColor,
            style: {
              fontSize: 18,
            }
          }}
          style = {{
            marginLeft: 15,
            marginRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor,
            flex: 1,
          }}
        />
        <Label
          onLongPress = { this.showChild('vehicle') }
          title = 'Viehcle'
          value = 'Y96EUV'
          titleStyle = {{
            color: '#ABB8C7',
            fontSize: 12,
          }}
          valueStyle = {{
            color: '#484E56',
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'font-awesome',
            name: 'car',
            color: leftIconColor,
            style: {
              fontSize: 18,
            }
          }}
          style = {{
            marginLeft: 5,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor,
            flex: 1,
          }}
        />
      </Animated.View>
    );
  }

  estimatedTime() {
    let i = this.animation.translateXs.length;
    this.animation.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          transform: [
            { translateX: this.animation.translateXs[i] },
          ],
        }}
      >
        <Label
          title = 'Estimated Time'
          value = '1 hour 30 mins'
          titleStyle = {{
            color: '#ABB8C7',
            fontSize: 12,
          }}
          valueStyle = {{
            color: '#484E56',
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'av-timer',
            color: leftIconColor,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            marginLeft: 15,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor,
          }}
        />
      </Animated.View>
    );
  }

  payment() {
    return (
      <Animated.View style = {{
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#F6F6F6',
        opacity: this.animation.paymentOpacity,
        transform: [
          { translateY: this.animation.paymentTranslateY },
        ],
      }}>
        <Carousel swipeThreshold = { 0.2 } >
          <CreditCard
            number = '1234'
            expiry = '12/23'
            name = 'Bo Huang'
            type = 'visa'
            cardScale = { 0.7 }
          />
        </Carousel>
        <Icon
          name = 'close'
          color = '#3FA6D1'
          size = { 20 }
          onPress = { this.hideChild('payment') }
          containerStyle = {{
            top: 5,
            right: 30,
            position: 'absolute',
          }}
        />
      </Animated.View>
    );
  }

  vehicle() {
    return (
      <Animated.View style = {{
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'red',
        opacity: this.animation.vehicleOpacity,
        transform: [
          { translateY: this.animation.vehicleTranslateY },
        ],
      }}>
        <Text>New Vehicle</Text>
      </Animated.View>
    );
  }

  placeOrder() {
    let i = this.animation.translateXs.length;
    this.animation.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View style = {{
        flex: 1,
        position: 'relative',
      }}>
        <Animated.View
          style = {{
            flex: 1,
            marginBottom: 20,
            justifyContent: 'flex-end',
            opacity: this.animation.placeOrderOpacity,
            transform: [
              { translateX: this.animation.translateXs[i] },
            ],
          }}
        >
          <Button
            title = 'Place Order'
            backgroundColor = '#3FA6D1'
            onPress = { () => { this.props.onBack(); } }
            style = {{
              position: 'relative'
            }}
          />
        </Animated.View>
        { this.payment() }
        { this.vehicle() }
      </Animated.View>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        flex: 1,
        width: Dimension.width,
        transform: [
          { translateX: this.animation.translateX },
        ],
      }}>
        <Animated.View style = {{
          transform: [
            { scale: this.animation.scale },
          ]
        }}>
          { this.location() }
          { this.service() }
          { this.schedule() }
          { this.paymentViechle() }
          { this.estimatedTime() }
        </Animated.View>
        { this.placeOrder() }
      </Animated.View>
    );
  }
}