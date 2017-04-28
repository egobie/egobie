// Import `I18n` before all other containers and components
import '../I18n/I18n';

import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import * as MetadataAction from '../Actions/MetadataAction';
import eGobieReducer from '../Reducers';
import eGobieSaga from '../Sagas';
import RootContainer from './RootContainer';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(eGobieReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(eGobieSaga);

export default class extends Component {
  componentDidMount() {
    /* Init Services */
    store.dispatch({
      type: MetadataAction.METADATA_GET_SERVICE,
    });
    /* Init Vehicle Makes */
    store.dispatch({
      type: MetadataAction.METADATA_GET_VEHICLE_MAKE,
    });
    /* Init Vehicle Models */
    store.dispatch({
      type: MetadataAction.METADATA_GET_VEHICLE_MODEL,
    });
    /* Init Discounts Info */
    store.dispatch({
      type: MetadataAction.METADATA_GET_DISCOUNT,
    });
  }

  render() {
    return (
      <Provider store = { store }>
        <RootContainer />
      </Provider>
    );
  }
}
