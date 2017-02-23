import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import { Button } from 'react-native-elements';

import Label from '../Components/Label';
import Dimension from '../Libs/Dimension';

const borderBottomColor = '#ABB8C7';
const leftIconColor = '#3FA6D1';

export default class extends Component {
  translateXs = [];

  constructor(props) {
    super(props);
    this.state = {
      translateX: new Animated.Value(0),
    }
  }

  show() {
    let animations = [
      Animated.timing(this.state.translateX, {
        toValue: 0 - Dimension.width,
        duration: 500,
        easing: Easing.out(Easing.cubic)
      })
    ];

    animations = animations.concat(this.translateXs.map((translateX, i) => {
      return Animated.timing(this.translateXs[i], {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        delay: i * 50,
      });
    }));

    Animated.parallel(animations).start();
  }

  hide() {
    Animated.timing(this.state.translateX, {
      toValue: Dimension.width,
      duration: 1500,
      easing: Easing.out(Easing.cubic)
    }).start();
  }

  rightIcon() {
    return {
      type: 'material-community',
      name: 'pencil',
      color: '#3FA6D1',
      style: {
        fontSize: 15,
        marginRight: 10,
        marginTop: 15,
      }
    };
  }

  location() {
    let i = this.translateXs.length;
    this.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          marginBottom: 5,
          transform: [
            { translateX: this.translateXs[i] },
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
    let i = this.translateXs.length;
    this.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          marginBottom: 5,
          transform: [
            { translateX: this.translateXs[i] },
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
    let i = this.translateXs.length;
    this.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          marginBottom: 5,
          transform: [
            { translateX: this.translateXs[i] },
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
    let i = this.translateXs.length;
    this.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          flexDirection: 'row',
          marginBottom: 5,
          transform: [
            { translateX: this.translateXs[i] },
          ],
        }}
      >
        <Label
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
          rightIcon = { this.rightIcon() }
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
          rightIcon = { this.rightIcon() }
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
    let i = this.translateXs.length;
    this.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          transform: [
            { translateX: this.translateXs[i] },
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

  placeOrder() {
    let i = this.translateXs.length;
    this.translateXs.push(new Animated.Value(Dimension.width));

    return (
      <Animated.View
        style = {{
          flex: 1,
          marginBottom: 30,
          justifyContent: 'flex-end',
          transform: [
            { translateX: this.translateXs[i] }
          ],
        }}
      >
        <Button
          title = 'Place Order'
          backgroundColor = '#3FA6D1'
          onPress = { () => { this.hide(); } }
        />
      </Animated.View>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        width: Dimension.width,
        borderColor: 'black',
        transform: [
          { translateX: this.state.translateX },
        ],
      }}>
        { this.location() }
        { this.service() }
        { this.schedule() }
        { this.paymentViechle() }
        { this.estimatedTime() }
        { this.placeOrder() }
      </Animated.View>
    );
  }
}