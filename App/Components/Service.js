import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

import * as ServiceAction from '../Actions/ServiceAction';
import eGobie from '../Styles/Egobie';


class Service extends Component {
  state = {
    selected: false,
    color: eGobie.EGOBIE_BLACK,
    iconColor: eGobie.EGOBIE_BLUE,
    backgroundColor: eGobie.EGOBIE_WHITE,
  };

  constructor(props) {
    super(props);
  }

  serviceIcon(type) {
    return {
      type: 'material-community',
      name: type === 'car_wash' ? 'car-wash' : 'oil',
      style: {
        color: this.state.iconColor,
        fontSize: 35,
        marginRight: 15,
      }
    };
  }

  onPress = () => {
    let selected = this.state.selected;
    this.setState({
      selected: !selected,
      backgroundColor: !selected ? eGobie.EGOBIE_BLACK: eGobie.EGOBIE_WHITE,
      color: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLACK,
      iconColor: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLUE,
    });
    this.props.onPress(this.props.id, !selected);
  }

  onLongPress = () => {
    this.props.onLongPress(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    let { selected } = nextProps;

    if (selected) {
      let find = selected.findIndex((service) => {
        return service.id === this.props.id;
      });

      if (find === -1 && this.state.selected) {
        this.onPress();
      }
    }
  }

  render() {
    return (
      <View style = {{
        backgroundColor: this.state.backgroundColor,
      }}>
        <ListItem
          hideChevron
          title = { this.props.title }
          titleStyle = {{
            color: this.state.color,
            fontWeight: '600',
          }}
          subtitle = { `Estimated Time: ${this.props.time}min` }
          subtitleStyle = {{
            color: this.state.color,
            width: 150,
            fontWeight: '300',
          }}
          rightTitle = { `$${this.props.price}.00` }
          rightTitleStyle = {{
            color: this.state.color,
            fontWeight: '600',
          }}
          leftIcon = { this.serviceIcon(this.props.type) }
          containerStyle = {{
            height: 70,
            marginLeft: 10,
            marginRight: 10,
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: eGobie.EGOBIE_GREY,
          }}
          onPress = { this.onPress }
          onLongPress = { this.onLongPress }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.service.selected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: (id, selected) => {
      if (selected) {
        dispatch({
          type: ServiceAction.SERVICE_SELECT,
          id,
        });
      } else {
        dispatch({
          type: ServiceAction.SERVICE_DESELECT,
          id,
        });
      }
    },
    onLongPress: (id) => {
      dispatch({
        type: ServiceAction.SERVICE_SHOW,
        id,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
