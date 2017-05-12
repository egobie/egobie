import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
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

  toggleService = () => {
    let selected = this.state.selected;
    this.setState({
      selected: !selected,
      backgroundColor: !selected ? eGobie.EGOBIE_BLACK: eGobie.EGOBIE_WHITE,
      color: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLACK,
      iconColor: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLUE,
    });
    this.props.toggleService(this.props.id, !selected);
  }

  showServiceDetail = () => {
    this.props.showServiceDetail(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    let { selected } = nextProps;

    if (selected) {
      let find = selected.findIndex((service) => {
        return service.id === this.props.id;
      });

      if (find === -1 && this.state.selected) {
        this.toggleService();
      }
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress = { this.toggleService }>
        <View style = {{
          position: 'relative',
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
              paddingRight: 20,
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
          />
          <View style = {{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            right: 0,
            bottom: 0,
            width: 40,
          }}>
            <Icon
              name = 'exclamation-circle'
              type = 'font-awesome'
              size = { 18 }
              color = { this.state.selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLUE }
              onPress = { this.showServiceDetail }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    toggleService: (id, selected) => {
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
    showServiceDetail: (id) => {
      dispatch({
        type: ServiceAction.SERVICE_SHOW,
        id,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
