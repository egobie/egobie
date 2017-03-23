// Import `I18n` before all other containers and components
import '../I18n/I18n';

import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import Reducer from '../Reducers';
import Saga from '../Sagas';
import RootContainer from './RootContainer';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducer, applyMiddleware(sagaMiddleware));

export default class extends Component {
  render() {
    return (
      <Provider store = { store }>
        <RootContainer />
      </Provider>
    );
  }
}
