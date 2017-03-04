import React, { Component } from 'react';
import { View } from 'react-native';

import MapView from 'react-native-maps';


class MapScreen extends Component {
  render() {
    return (
      <View style = {{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <MapView
          style = {{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {

}

export default MapScreen;
