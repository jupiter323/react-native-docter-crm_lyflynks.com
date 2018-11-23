import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src';
import configureStore from './src/store';

const store = configureStore();

AppRegistry.registerComponent('LYN', () => () => <App store={store} />);
