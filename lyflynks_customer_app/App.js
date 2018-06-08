import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import NavigatorService from './Navigation/service/navigator';
import Navigation from './Navigation/navigationStack';
import store from './store';

export default class LyfLynks_App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
      />
      </Provider>
    );
  }
}
