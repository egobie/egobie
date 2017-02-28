import React, { Component } from 'react';
import { View, Text, Modal, Animated, Easing } from 'react-native';

import Reactotron from 'reactotron-react-native';
import { Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import Plate from '../Components/Plate';
import CreditCard from '../Components/CreditCard';
import Label from '../Components/Label';
import CalendarModal from '../Modals/CalendarModal';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


export default class extends Component {
  showedChild = '';

  constructor(props) {
    super(props);
    this.animation = {
      translateXs: [],
      translateX: new Animated.Value(0),
      scale: new Animated.Value(1),
      maskIndex: new Animated.Value(-1),
      maskOpacity: new Animated.Value(0),
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
      Animated.timing(this.animation.maskOpacity, {
        toValue: 0.6,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.maskIndex, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
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
      Animated.timing(this.animation.maskOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.maskIndex, {
        toValue: -1,
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
    //   color: eGobie.EGOBIE_BLUE,
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
            color: eGobie.EGOBIE_GREY,
            fontSize: 12,
          }}
          valueStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'map-marker-radius',
            color: eGobie.EGOBIE_BLUE,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            marginLeft: 15,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: eGobie.EGOBIE_GREY,
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
            color: eGobie.EGOBIE_GREY,
            fontSize: 12,
          }}
          valueStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'car-wash',
            color: eGobie.EGOBIE_BLUE,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            paddingTop: 5,
            paddingBottom: 5,
            marginLeft: 15,
            marginRight: 15,
            borderBottomWidth: 1,
            borderBottomColor: eGobie.EGOBIE_GREY,
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
            color: eGobie.EGOBIE_GREY,
            fontSize: 12,
          }}
          valueStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'calendar-check',
            color: eGobie.EGOBIE_BLUE,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            marginLeft: 15,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: eGobie.EGOBIE_GREY,
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
            color: eGobie.EGOBIE_GREY,
            fontSize: 12,
          }}
          valueStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'font-awesome',
            name: 'cc-visa',
            color: eGobie.EGOBIE_BLUE,
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
            borderBottomColor: eGobie.EGOBIE_GREY,
            flex: 1,
          }}
        />
        <Label
          onLongPress = { this.showChild('vehicle') }
          title = 'Viehcle'
          value = 'Y96EUV'
          titleStyle = {{
            color: eGobie.EGOBIE_GREY,
            fontSize: 12,
          }}
          valueStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'font-awesome',
            name: 'car',
            color: eGobie.EGOBIE_BLUE,
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
            borderBottomColor: eGobie.EGOBIE_GREY,
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
            color: eGobie.EGOBIE_GREY,
            fontSize: 12,
          }}
          valueStyle = {{
            color: eGobie.EGOBIE_BLACK,
            fontSize: 12,
          }}
          leftIcon = {{
            type: 'material-community',
            name: 'av-timer',
            color: eGobie.EGOBIE_BLUE,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            marginLeft: 15,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: eGobie.EGOBIE_GREY,
          }}
        />
      </Animated.View>
    );
  }

  payments() {
    return [1].map((_, i) => {
      return (
        <CreditCard
          key = { i }
          number = '1234'
          expiry = '12/23'
          name = 'Bo Huang'
          type = 'visa'
          cardScale = { 0.7 }
          containerStyle = {{
            width: Dimension.width,
          }}
        />
      );
    });
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
        backgroundColor: eGobie.EGOBIE_WHITE,
        opacity: this.animation.paymentOpacity,
        transform: [
          { translateY: this.animation.paymentTranslateY },
        ],
      }}>
        <Carousel
          sliderWidth = { Dimension.width }
          itemWidth = { Dimension.width }
          inactiveSlideScale = { 0.94 }
          inactiveSlideOpacity = { 0.6 }
          enableMomentum = { true }
          showsHorizontalScrollIndicator = { false }
          snapOnAndroid = { true }
          removeClippedSubviews = { false }
          swipeThreshold = { 1 }
        >
          { this.payments() }
        </Carousel>
        <Icon
          name = 'close'
          color = { eGobie.EGOBIE_BLUE }
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

  vehicles() {
    return [1, 2, 3, 4, 5].map((_, i) => {
      return (
        <Plate
          key = { i }
          index = { i }
          number = 'Y96EUV'
          state = 'New Jersey'
          plateScale = { 0.7 }
        />
      );
    });
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
        backgroundColor: eGobie.EGOBIE_WHITE,
        opacity: this.animation.vehicleOpacity,
        transform: [
          { translateY: this.animation.vehicleTranslateY },
        ],
      }}>
        <Carousel
          sliderWidth = { Dimension.width }
          itemWidth = { Dimension.width }
          inactiveSlideScale = { 0.94 }
          inactiveSlideOpacity = { 0.6 }
          enableMomentum = { true }
          showsHorizontalScrollIndicator = { false }
          snapOnAndroid = { true }
          removeClippedSubviews = { false }
          swipeThreshold = { 1 }
        >
          { this.vehicles() }
        </Carousel>
        <Icon
          name = 'close'
          color = { eGobie.EGOBIE_BLUE }
          size = { 20 }
          onPress = { this.hideChild('vehicle') }
          containerStyle = {{
            top: 5,
            right: 30,
            position: 'absolute',
          }}
        />
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
        zIndex: 2,
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
            backgroundColor = { eGobie.EGOBIE_BLUE }
            onPress = { () => { this.props.onBack() } }
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

  mask() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: this.animation.maskOpacity,
        zIndex: this.animation.maskIndex,
        backgroundColor: '#333',
      }}/>
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
        { this.mask() }
        { this.placeOrder() }
      </Animated.View>
    );
  }
}