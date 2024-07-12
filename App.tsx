import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import {COLORS} from './src/constants';
import RootNavigator from './src/navigation/root-nav/RootNavigator';


const App = () => {

  return (
    <>
      <StatusBar backgroundColor={COLORS.PRIMARY} />
      <RootNavigator />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
