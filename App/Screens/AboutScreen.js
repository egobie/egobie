import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { ListItem, Icon } from 'react-native-elements';

import Dimension from '../Libs/Dimension'
import eGobie from '../Styles/Egobie';


const titleStyle = {
  fontSize: 16,
  fontWeight: '400',
}

const rightIcon = {
  name: 'chevron-right',
  color: eGobie.EGOBIE_GREY,
};

class AboutScreen extends Component {
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

  render() {
    return (
      <View>
        <View style = {{
          marginTop: 15,
          marginLeft: 10,
          marginRight: 10,
        }}>
          <ListItem
            hideChevron
            title = { 'Version' }
            titleStyle = { titleStyle }
            rightTitle = { '2.0.0' }
            rightTitleStyle = {{
              color: eGobie.EGOBIE_BLACK,
            }}
            containerStyle = {{
              borderBottomWidth: 1,
              borderBottomColor: eGobie.EGOBIE_GREY,
            }}
          />
          <ListItem
            title = { 'Rate us in the App Store' }
            titleStyle = { titleStyle }
            rightIcon = { rightIcon }
          />
          <ListItem
            title = { 'eGobie.com' }
            titleStyle = { titleStyle }
            rightIcon = { rightIcon }
          />
          <ListItem
            title = { 'FAQ' }
            titleStyle = { titleStyle }
            rightIcon = { rightIcon }
          />
          <ListItem
            title = { 'Feedback' }
            titleStyle = { titleStyle }
            rightIcon = { rightIcon }
          />
        </View>
      </View>
    );
  }
};

export default AboutScreen;