// Import `I18n` before all other containers and components
import '../I18n/I18n';

import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootContainer from './RootContainer';
import AppSaga from '../Sagas';

export default class extends Component {
  render() {
    return (
      <Provider store = { createStore(AppSaga) }>
        <RootContainer />
      </Provider>
    );
  }
}
