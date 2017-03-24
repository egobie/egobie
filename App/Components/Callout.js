import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Icon } from 'react-native-elements';

import eGobie from '../Styles/Egobie';


class Callout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style = {{
          flex: 9,
          fontSize: 14,
          color: eGobie.EGOBIE_BLUE,
          height: 25,
          lineHeight: 25,
        }}>
          { this.props.location }
        </Text>
        <View style = {{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 25,
        }}>
          <Icon
            type = { 'material-community' }
            name = { 'chevron-right' }
            color = { eGobie.EGOBIE_BLUE }
            iconStyle = {{
              flex: 1,
              justifyContent: 'center',
              paddingTop: 1,
            }}
          />
        </View>
      </View>
    );
  }
}

Callout.propTypes = {
  location: React.PropTypes.string.isRequired,
};

export default Callout;