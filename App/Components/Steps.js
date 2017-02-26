import React, { Component } from 'react';
import { View } from 'react-native';

import I18n from 'react-native-i18n';

import StepIndicator from '../Libs/StepIndicator';
import eGobie from '../Styles/Egobie';


const labels = [
  I18n.t('step.service'),
  I18n.t('step.location'),
  I18n.t('step.payment'),
  I18n.t('step.confirm'),
];

export default class extends Component {
  render() {
    return (
      <StepIndicator
        labels = { labels }
        stepCount = { labels.length }
        currentPosition = { 0 }
        customStyles = {{
          separatorStrokeWidth: 2,

          stepIndicatorSize: 15,
          currentStepIndicatorSize: 20,

          separatorUnFinishedColor: eGobie.EGOBIE_GREY,
          separatorFinishedColor: eGobie.EGOBIE_GREEN,

          stepIndicatorUnFinishedColor: eGobie.EGOBIE_GREY,
          stepIndicatorFinishedColor: eGobie.EGOBIE_GREEN,
          stepStrokeCurrentColor: eGobie.EGOBIE_BLUE,

          stepIndicatorLabelFontSize: 8,
          stepIndicatorLabelFinishedColor: eGobie.EGOBIE_WHITE,
          stepIndicatorLabelCurrentColor: eGobie.EGOBIE_WHITE,
          currentStepIndicatorLabelFontSize: 10,
          stepIndicatorCurrentColor: eGobie.EGOBIE_BLUE,

          labelSize: 8,
          labelColor: eGobie.EGOBIE_BLACK,
          currentStepLabelColor: eGobie.EGOBIE_BLUE,
        }}
        style = { this.props.style }
      />
    );
  }
}
