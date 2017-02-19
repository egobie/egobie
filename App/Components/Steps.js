import React, { Component } from 'react';
import { View } from 'react-native';

import I18n from 'react-native-i18n';

import StepIndicator from '../Libs/StepIndicator';


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

          separatorUnFinishedColor: '#ABB8C7',
          separatorFinishedColor: '#4AAE4F',

          stepIndicatorUnFinishedColor: '#ABB8C7',
          stepIndicatorFinishedColor: '#4AAE4F',
          stepStrokeCurrentColor: '#3FA6D1',

          stepIndicatorLabelFontSize: 8,
          stepIndicatorLabelFinishedColor: '#F6F6F6',
          stepIndicatorLabelCurrentColor: '#F6F6F6',
          currentStepIndicatorLabelFontSize: 10,
          stepIndicatorCurrentColor: '#3FA6D1',

          labelSize: 8,
          labelColor: '#484E56',
          currentStepLabelColor: '#3FA6D1',
        }}
        style = { this.props.style }
      />
    );
  }
}
