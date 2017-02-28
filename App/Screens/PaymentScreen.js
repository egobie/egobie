import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { ListItem, Button, Icon } from 'react-native-elements';

import PaymentModal from '../Modals/PaymentModal';
import CreditCardIcons from '../Libs/CreditCardIcon';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


class PaymentScreen extends Component {
  static navigationOptions = {
    title: 'Payments',
    header: ({ goBack }) => ({
      titleStyle: {
        fontWeight: '400',
      },
      left: (
        <TouchableWithoutFeedback
          onPress = { () => goBack() }
        >
          <View>
            <Icon
              type = { 'material-community' }
              name = { 'chevron-left' }
              iconStyle = {{
                color: eGobie.EGOBIE_BLUE,
                fontWeight: '400',
                fontSize: 35,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      ),
    }),
  };

  showPaymentModal() {
    this.refs.payment.show();
  }

  payments() {
    return [1, 2].map((_, i) => {
      return (
        <TouchableWithoutFeedback
          key = { i }
        >
          <View>
            <ListItem
              hideChevron
              avatar = { CreditCardIcons['maestro'] }
              avatarStyle = {{
                width: 50,
                borderRadius: 5,
              }}
              title = { '•••• •••• •••• 1234' }
              titleStyle = {{
                color: eGobie.EGOBIE_BLACK,
                fontSize: 16,
                fontWeight: '500',
              }}
              subtitle = { 'Bo Huang' }
              subtitleStyle = {{
                fontSize: 14,
                fontWeight: '400',
              }}
              containerStyle = {{
                marginTop: 5,
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: eGobie.EGOBIE_WHITE,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        { this.payments() }
        <Button
          onPress = { () => { this.showPaymentModal() } }
          title = 'ADD NEW CARD'
          buttonStyle = {{
            marginTop: 10,
            backgroundColor: eGobie.EGOBIE_BLUE,
            ...BoxShadow
          }}
        />
        <PaymentModal ref = { 'payment' }/>
      </ScrollView>
    );
  }
};

export default PaymentScreen;