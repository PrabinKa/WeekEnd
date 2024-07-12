import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {COLORS, IMAGE_PATH} from '../../constants';
import {widthPixel} from '../../constants';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {container, imageWrapper, imageStyles} = styles;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={container}>
      <View style={imageWrapper}>
        <Image source={IMAGE_PATH.ICON} style={imageStyles} />
      </View>
      <ActivityIndicator size={'small'} color={'#FFF'} />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    height: widthPixel(40),
    width: widthPixel(40),
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageStyles: {
    height: '100%',
    width: '100%',
  },
});
