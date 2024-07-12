import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {COLORS} from './src/constants';
import RootNavigator from './src/navigation/root-nav/RootNavigator';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.PRIMARY} />
      <RootNavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
