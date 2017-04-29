import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as MetadataAction from '../Actions/MetadataAction';
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
    this.props.onPress(this.props.id, !selected);
    this.setState({
      selected: !selected,
      backgroundColor: !selected ? eGobie.EGOBIE_BLACK: eGobie.EGOBIE_WHITE,
      color: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLACK,
      iconColor: !selected ? eGobie.EGOBIE_WHITE : eGobie.EGOBIE_BLUE,
    });
  }

  onLongPress = () => {
    this.props.onLongPress(this.props.id);
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

Service.propTypes = {
  id: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  time: React.PropTypes.number.isRequired,
  price: React.PropTypes.number.isRequired,
  onPress: React.PropTypes.func.isRequired,
  onLongPress: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: (serviceId, selected) => {
      if (selected) {
        dispatch({
          type: MetadataAction.SERVICE_SELECT,
          serviceId,
        });
      } else {
        dispatch({
          type: MetadataAction.SERVICE_DESELECT,
          serviceId,
        });
      }
    },
    onLongPress: (serviceId) => {
      dispatch({
        type: MetadataAction.SERVICE_DETAIL,
        serviceId,
      });
      dispatch({
        type: WorkflowAction.WORK_FLOW_SERVICE_DETAIL,
        serviceId,
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(Service);
