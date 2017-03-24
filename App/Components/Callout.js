import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Callout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {{
        width: 200,
        height: 100,
      }}>
        <Text>This is a callout</Text>
      </View>
    );
  }
}

Callout.propTypes = {

};

export default Callout;