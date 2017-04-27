import React, { Component } from 'react';
import { View, Text, Modal, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import * as WorkflowAction from '../Actions/WorkflowAction';
import Vehicle from '../Components/Vehicle';
import Plate from '../Components/Plate';
import CreditCard from '../Components/CreditCard';
import Label from '../Components/Label';
import CalendarModal from '../Modals/CalendarModal';
import Dimension from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';
import * as Price from '../Libs/Price';


class OrderScreen extends Component {
  showedChild = '';
  state = {
    scale: new Animated.Value(1),
    maskIndex: new Animated.Value(-1),
    maskOpacity: new Animated.Value(0),
    placeOrderOpacity: new Animated.Value(1),
    paymentTranslateY: new Animated.Value(200),
    paymentOpacity: new Animated.Value(0),
    vehicleTranslateY: new Animated.Value(200),
    vehicleOpacity: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
  }

  _showChild(child) {
    if (this.showedChild !== '') {
      return;
    }

    this.showedChild = child;
    Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 0.9,
        tension: 40,
        friction: 2,
      }),
      Animated.timing(this.state.maskOpacity, {
        toValue: 0.6,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.maskIndex, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.placeOrderOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state[`${child}Opacity`], {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(this.state[`${child}TranslateY`], {
        toValue: 0,
        tension: 40,
        friction: 5,
      }),
    ]).start();
  }

  _hideChild(child) {
    this.showedChild = '';
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.maskOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.maskIndex, {
        toValue: -1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.placeOrderOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state[`${child}Opacity`], {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        delay: 50,
      }),
      Animated.spring(this.state[`${child}TranslateY`], {
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
    return (
      <Animated.View style = {{
        marginBottom: 5,
      }}>
        <Label
          onPress = { () => { this.props.changeWorkflow(WorkflowAction.WORK_FLOW_LOCATION); } }
          title = 'Location'
          value = { this.props.address }
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
    return (
      <Animated.View style = {{
        marginBottom: 5,
      }}>
        <Label
          onPress = { () => { this.props.changeWorkflow(WorkflowAction.WORK_FLOW_SERVICE); } }
          title = 'Service'
          value = { this.props.services }
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
    return (
      <Animated.View style = {{
        marginBottom: 5,
      }}>
        <Label
          onPress = { () => { this.props.changeWorkflow(WorkflowAction.WORK_FLOW_CALENDAR); } }
          title = 'Schedule'
          value = { this.props.schedule }
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
    return (
      <Animated.View style = {{
        flexDirection: 'row',
        marginBottom: 5,
      }}>
        <Label
          onPress = { this.showChild('payment') }
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
            name: 'credit-card-alt',
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
          onPress = { this.showChild('vehicle') }
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

  estimatedTimeAndPrice() {
    return (
      <Animated.View style = {{
        flexDirection: 'row',
      }}>
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
            flex: 1,
            marginLeft: 15,
            marginRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: eGobie.EGOBIE_GREY,
          }}
        />
        <Label
          title = 'Estimated Price'
          value = { this.props.price }
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
            name: 'money',
            color: eGobie.EGOBIE_BLUE,
            size: 20,
          }}
          rightIcon = { this.rightIcon() }
          style = {{
            flex: 1,
            marginLeft: 5,
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
    let cards = [];

    if (cards.length === 0) {
      return [-1].map((_, i) => {
        return (
          <Button
            key = { i }
            raised
            onPress = { () => { this.props.changeWorkflow(WorkflowAction.WORK_FLOW_PAYMENT); } }
            title = { 'ADD PAYMENT' }
            icon = {{
              type: 'material-community',
              name: 'credit-card-plus',
            }}
            color = { eGobie.EGOBIE_WHITE }
            backgroundColor = { eGobie.EGOBIE_BLUE }
            buttonStyle = {{
              width: 180,
              marginTop: 80,
              marginLeft: Dimension.width / 2 - 90,
            }}/>
        );
      });
    } else {
      return cards.map((_, i) => {
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
        opacity: this.state.paymentOpacity,
        transform: [
          { translateY: this.state.paymentTranslateY },
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
          color = { eGobie.EGOBIE_RED }
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
    let cars = [];

    if (cars.length === 0) {
      return [-1].map((_, i) => {
        return (
          <Button
            key = { i }
            raised
            onPress = { () => { this.props.changeWorkflow(WorkflowAction.WORK_FLOW_VEHICLE); } }
            title = { 'ADD VEHICLE' }
            icon = {{
              type: 'material-community',
              name: 'plus',
            }}
            color = { eGobie.EGOBIE_WHITE }
            backgroundColor = { eGobie.EGOBIE_BLUE }
            buttonStyle = {{
              width: 180,
              marginTop: 80,
              marginLeft: Dimension.width / 2 - 90,
            }}/>
        );
      });
    } else {
      return cars.map((type, i) => {
        return (
          <View
            key = { i }
            style = {{
              flex: 1,
              width: Dimension.width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
          <Vehicle
            key = { i }
            plate = 'Y96EUV'
            make = 'Honda'
            model = 'Accord'
            year = '2013'
            color = 'White'
            type = { type }
          />
          </View>
        );
      });
    }
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
        opacity: this.state.vehicleOpacity,
        transform: [
          { translateY: this.state.vehicleTranslateY },
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
          color = { eGobie.EGOBIE_RED }
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
            opacity: this.state.placeOrderOpacity,
          }}
        >
          <Button
            title = 'Make Reservation'
            backgroundColor = { eGobie.EGOBIE_BLUE }
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
        opacity: this.state.maskOpacity,
        zIndex: this.state.maskIndex,
        backgroundColor: '#333',
      }}/>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        flex: 1,
        width: Dimension.width,
        backgroundColor: eGobie.EGOBIE_WHITE,
      }}>
        <Animated.View style = {{
          marginTop: 10,
          transform: [
            { scale: this.state.scale },
          ]
        }}>
          { this.location() }
          { this.service() }
          { this.paymentViechle() }
          { this.schedule() }
          { this.estimatedTimeAndPrice() }
        </Animated.View>
        { this.mask() }
        { this.placeOrder() }
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  let services = state.service.selected.map((service) => {
    return service.name;
  });

  return {
    address: state.location.formattedAddress,
    workflow: state.workflow.name,
    schedule: `${state.calendar.date} ${state.calendar.range}`,
    services: services.length > 0 ? services.join(', ') : ' ',
    price: Price.totalPrice([], 0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeWorkflow: (type) => {
      dispatch({ type });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);