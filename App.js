/**
 * BLE Scanner
 */

'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import RootComponent from './src/root/RootComponent';
import ErrorComponent from './src/root/ErrorComponent';
import BleComponent from './src/ble/BleComponent';
import reducer from './src/root/Reducer';

import { Iterable } from 'immutable';

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) {
        return state.toJS();
    }
    else {
        return state;
    }
};

const logger = createLogger({ stateTransformer });
const store = createStore(reducer);


export default class App extends Component/*<{}>*/ {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <ErrorComponent />
                    <RootComponent />
                    /*<BleComponent />*/
                </View>
            </Provider>
        );
    }
}
