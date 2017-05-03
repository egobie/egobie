import React, { Component } from 'react';
import { Animated, View, ScrollView, Easing } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'react-native-i18n';
import { List, ListItem } from 'react-native-elements';

import * as WorkflowAction from '../Actions/WorkflowAction';
import eGobie from '../Styles/Egobie';
import Dimensions from '../Libs/Dimension';


const titleStyle = {
  color: eGobie.EGOBIE_BLACK,
  fontSize: 14,
  fontWeight: '500',
};

const subtitleStyle = {
  color: eGobie.EGOBIE_GREY,
  fontSize: 13,
  fontWeight: '400',
};

const containerStyle = {
  backgroundColor: eGobie.EGOBIE_WHITE,
};

const leftIconStyle = {
  fontSize: 25,
}

class MenuScreen extends Component {
  menuItems = [
    {
      title: I18n.t('menu.myServices'),
      icon: 'oil',
      onPress: () => { },
    },
    {
      title: I18n.t('menu.vehicles'),
      icon: 'car',
      onPress: () => { this.props.navigation.navigate('Vehicles') },
    },
    {
      title: I18n.t('menu.payments'),
      icon: 'credit-card',
      onPress: () => { this.props.navigation.navigate('Payments') },
    },
    {
      title: I18n.t('menu.coupons'),
      icon: 'barcode',
      onPress: () => { },
    },
    {
      title: I18n.t('menu.notifications'),
      icon: 'comment-alert',
      onPress: () => { },
    }
  ];

  moreItems = [
    {
      title: I18n.t('menu.about'),
      icon: 'comment-question-outline',
      onPress: () => { this.props.navigation.navigate('About') },
    },
  ];

  state = {
    translateX: new Animated.Value(-1 * Dimensions.width),
  }

  constructor(props) {
    super(props);
  }

  show = () => {
    Animated.timing(this.state.translateX, {
      toValue: 0,
      easing: Easing.cubic(Easing.out),
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.translateX, {
      toValue: -1 * Dimensions.width,
      easing: Easing.cubic(Easing.out),
    }).start();
  }

  user() {
    return (
      <ListItem
        onPress = { () => { this.props.navigation.navigate('User') } }
        leftIcon = {{
          type: 'material-community',
          name: 'account',
          color: eGobie.EGOBIE_BLUE,
          style: leftIconStyle,
        }}
        rightIcon = {{
          name: 'chevron-right',
          color: eGobie.EGOBIE_GREY,
        }}
        title = { 'Bo Huang' }
        titleStyle = { titleStyle }
        subtitle = { `eGobie Account: bhuang3` }
        subtitleStyle = { subtitleStyle }
        containerStyle = { containerStyle }
      />
    );
  }

  menu() {
    return this.menuItems.map((item, i) => {
      return (
        <ListItem
          key = { i }
          onPress = { item.onPress }
          leftIcon = {{
            type: 'material-community',
            color: eGobie.EGOBIE_BLUE,
            name: item.icon,
            style: leftIconStyle,
          }}
          rightIcon = {{
            name: 'chevron-right',
            color: eGobie.EGOBIE_GREY,
          }}
          title = { item.title }
          titleStyle = {{
            ...titleStyle,
            fontSize: 13,
          }}
          containerStyle = { containerStyle }
        />
      );
    });
  }

  other() {
    return this.moreItems.map((item, i) => {
      return (
        <ListItem
          key = { i }
          onPress = { item.onPress }
          leftIcon = {{
            type: 'material-community',
            color: eGobie.EGOBIE_BLUE,
            name: item.icon,
            style: leftIconStyle,
          }}
          rightIcon = {{
            name: 'chevron-right',
            color: eGobie.EGOBIE_GREY,
          }}
          title = { item.title }
          titleStyle = {{
            ...titleStyle,
            fontSize: 13,
          }}
          containerStyle = { containerStyle }
        />
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_MENU:
        this.show();
        break;
    }
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        width: Dimensions.width,
        height: Dimensions.height,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        transform: [
          { translateX: this.state.translateX },
        ],
      }}>
        <ScrollView
          showsHorizontalScrollIndicator = { false }
          showsVerticalScrollIndicator = { false }
        >
          <View style = {{
            height: Dimensions.height,
            width: Dimensions.width * 0.8,
            paddingTop: 30,
            backgroundColor: eGobie.EGOBIE_WHITE,
          }}>
            { this.user() }
            { this.menu() }
            { this.other() }
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideMenu: () => {
      dispatch({
        type: WorkflowAction.WORK_FLOW_BACK,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
