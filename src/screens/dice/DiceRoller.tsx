import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabHeader} from '../../components';

interface DiceRollerProps {
  navigation: any;
}

const DiceRoller: React.FC<DiceRollerProps> = ({navigation}) => {
  return (
    <TabHeader navigation={navigation}>
      <View>
        <Text>DiceRoller</Text>
      </View>
    </TabHeader>
  );
};

export default DiceRoller;

const styles = StyleSheet.create({});
