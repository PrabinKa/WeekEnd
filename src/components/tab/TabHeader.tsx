import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  COLORS,
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

interface TabHeaderProps {
  children: ReactNode;
  navigation: any;
}

const TabHeader: React.FC<TabHeaderProps> = ({children, navigation}) => {
  const {container, screenName} = styles;
  const route = useRoute();

  return (
    <SafeAreaView>
      <View style={container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={30} color={COLORS.WHITE} />
        </TouchableOpacity>
        <Text style={screenName}>{route.name}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    height: heightPixel(60),
    width: width,
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: pixelSizeHorizontal(12),
  },
  screenName: {
    marginLeft: pixelSizeHorizontal(20),
    fontSize: fontPixel(22),
    color: COLORS.WHITE,
    fontWeight: '500',
  },
});
