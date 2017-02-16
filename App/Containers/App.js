import React, { Component } from 'react'

// Keep before all containers and components
import '../I18n/I18n';
import { SideMenuContainer } from './SideMenuContainer';


export default class App extends Component {
  render() {
    return (
      <SideMenuContainer />
    );
  }
}