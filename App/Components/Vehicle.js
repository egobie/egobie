import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import * as VehicleAction from '../Actions/VehicleAction';
import Label from './Label';
import VehicleIcons from '../Libs/VehicleIcon';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';


const labelStyle = {
  titleStyle: {
    color: eGobie.EGOBIE_GREY,
    marginLeft: 0,
    fontSize: 12,
  },

  valueStyle: {
    color: eGobie.EGOBIE_BLACK,
    marginLeft: 0,
    fontSize: 12,
  },

  style: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: eGobie.EGOBIE_GREY,
  },
};

class Vehicle extends Component {
  state = {
    opacity: 0.5,
  };

  constructor(props) {
    super(props);
  }

  plate() {
    return (
      <View style = {{
        width: 180,
        height: 40,
      }}>
        <Label
          title = 'Plate'
          value = { this.props.plate }
          avatar = { VehicleIcons[this.props.type] }
          avatarStyle = {{
            marginRight: 10,
            transform: [
              { scale: 0.9 },
            ],
          }}
          { ...labelStyle }
        />
      </View>
    );
  }

  makeAndModel() {
    return (
      <View style = {{
        width: 180,
        height: 80,
      }}>
        <Label
          title = 'Make'
          value = { this.props.make }
          { ...labelStyle }
        />
        <Label
          title = 'Model'
          value = { this.props.model }
          { ...labelStyle }
        />
      </View>
    );
  }

  yearAndColor() {
    return (
      <View style = {{
        flexDirection: 'row',
      }}>
        <Label
          title = 'Year'
          value = { this.props.year }
          { ...labelStyle }
        />
        <Label
          title = 'Color'
          value = { this.props.color }
          { ...labelStyle }
        />
      </View>
    );
  }

  highlight = () => {
    this.setState({
      opacity: 1,
    });
  }

  resetState = () => {
    this.setState({
      opacity: 0.5,
    });
  }

  chooseVehicle = () => {
    this.props.chooseVehicle(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && nextProps.selected.id === this.props.id) {
      this.highlight();
    } else {
      this.resetState();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    Reactotron.log('shouldComponentUpdate - Vehicle');
    return true;
  }

  render() {
    return (
      <TouchableOpacity onPress = { this.chooseVehicle } >
        <View
          style = {{
            height: 180,
            width: 180,
            paddingTop: 5,
            backgroundColor: eGobie.EGOBIE_WHITE,
            opacity: this.state.opacity,
            transform: [
              { scale: 0.9 },
            ],
            ...BoxShadow,
          }}
        >
          { this.plate() }
          { this.yearAndColor() }
          { this.makeAndModel() }
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected: state.vehicle.selected,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseVehicle: (id) => {
      dispatch({
        type: VehicleAction.VEHICLE_SELECT,
        id,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
