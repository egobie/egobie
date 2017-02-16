import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { SideMenu, List, ListItem, Grid, Row } from 'react-native-elements';
import SideMenuStyle from '../Styles/SideMenuStyle';


export class SideMenuContainer extends Component {
  logo = require('../Images/Logo/white.png');
  bg = require('../Images/BG/menu.png')
  menuItems = [
    { title: I18n.t('menu.home'),           icon: require('../Images/home.png') },
    { title: I18n.t('menu.egobieServices'), icon: require('../Images/services.png') },
    { title: I18n.t('menu.myServices'),     icon: require('../Images/history.png') },
    { title: I18n.t('menu.coupons'),        icon: require('../Images/coupon.png') },
    { title: I18n.t('menu.vehicles'),       icon: require('../Images/vehicles.png') },
    { title: I18n.t('menu.payments'),       icon: require('../Images/payment.png') },
    { title: I18n.t('menu.notifications'),  icon: require('../Images/notifications.png') },
    { title: I18n.t('menu.settings'),       icon: require('../Images/settings.png') },
    { title: I18n.t('menu.about'),          icon: require('../Images/about.png') },
  ];

  constructor() {
    super();
  }

  createUserProfile() {
    return (
      <View style = { SideMenuStyle.userProfile }>
        <Image
          source = { this.logo }
          style = { SideMenuStyle.logo }/>
        <Text style = { SideMenuStyle.username }>{ 'Welcome' }</Text>
      </View>
    );
  }

  createMenuItems() {
    return (
      <List containerStyle = { SideMenuStyle.menuItemContainer }>
      {
        this.menuItems.map((menuItem, i) => {
          return (
            <ListItem
              hideChevron
              key = {i}
              title = { menuItem.title }
              avatar = { menuItem.icon }
              avatarStyle = { SideMenuStyle.menuIcon }
              containerStyle = { SideMenuStyle.menuItem }
              titleContainerStyle = { SideMenuStyle.menuTitleContainer }
              titleStyle = { SideMenuStyle.menuTitle }
            />
          );
        })
      }
      </List>
    );
  }

  createMenuComponent() {
    return (
      <View style = {{ flex: 1 }}>
        <Image
          source = { this.bg }
          style = { SideMenuStyle.menuBg }/>
        <Grid>
          <Row size = { 25 }>
            { this.createUserProfile() }
          </Row>
          <Row size = { 65 }>
            { this.createMenuItems() }
          </Row>
          <Row size = { 15 }>
            { this.createUserProfile() }
          </Row>
        </Grid>
      </View>
    );
  }

  render() {
    return (
      <SideMenu
        menu = { this.createMenuComponent() }
        edgeHitWidth = { 20 } >
        <View style = {{ backgroundColor: 'white', flex: 1 }}>
          <Text>Hahahahah</Text>
        </View>
      </SideMenu>
    );
  }
};