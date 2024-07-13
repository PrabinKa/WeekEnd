import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {COLORS} from './src/constants';
import RootNavigator from './src/navigation/root-nav/RootNavigator';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import ContextProvider from './src/context/AppContext';

const App = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <StatusBar backgroundColor={COLORS.PRIMARY} />
        <RootNavigator />
      </ContextProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
