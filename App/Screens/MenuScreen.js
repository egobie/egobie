import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import I18n from 'react-native-i18n';
import { List, ListItem } from 'react-native-elements';

import eGobie from '../Styles/Egobie';


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
      onPress: () => { },
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

  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator = { false }
        showsVerticalScrollIndicator = { false }
      >
        <View>
          { this.user() }
        </View>
        <View style = {{
          marginTop: 15,
        }}>
          { this.menu() }
        </View>
        <View style = {{
          marginTop: 15,
        }}>
        { this.other() }
        </View>
      </ScrollView>
    );
  }
};

MenuScreen.propTypes = {

};

export default MenuScreen;
