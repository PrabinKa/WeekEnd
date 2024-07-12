import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import {COLORS, fontPixel, heightPixel, IMAGE_PATH, pixelSizeHorizontal, pixelSizeVertical} from '../../constants';
import {Genre, PlainButton} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

interface DetailedMovieScreenProps {
  route: any;
  navigation: any;
}

const DetailedMovieScreen: React.FC<DetailedMovieScreenProps> = ({
  route,
  navigation,
}) => {
  const {
    container,
    posterWrapper,
    posterStyles,
    backbuttonWrapper,
    backbuttonStyles,
    imdbText,
    movieTitleWrapper,
    movieTitle,
    buttonsWrapper,
    smallIconsWrapper,
    descriptionText,
    releaseDateStyles,
    smallIconButton,
    imdbStyles,
    overlay,
  } = styles;

  const {item} = route.params;

  interface SmallIconProps {
    icon: string;
  }

  const SmallIcon: React.FC<SmallIconProps> = ({icon}) => {
    return (
      <TouchableOpacity activeOpacity={0.5} style={smallIconButton}>
        <Ionicons name={icon} size={25} color={COLORS.PRIMARY} />
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={container}>
      <View style={posterWrapper}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.goBack();
          }}
          style={backbuttonWrapper}>
          <Image source={IMAGE_PATH.PREVIOUS} style={backbuttonStyles} />
        </TouchableOpacity>
        <Image source={{uri: item.backdrop}} style={posterStyles} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={overlay}
        />
        <View style={movieTitleWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View style={imdbStyles}>
              <Text style={imdbText}>IMDB</Text>
            </View>
            <Text style={{color: COLORS.WHITE, fontWeight: 'bold'}}>
              {item.rating.toFixed(1)}
            </Text>
          </View>
          <Text style={movieTitle}>{item.title}</Text>
        </View>
      </View>

      <View style={{paddingHorizontal: pixelSizeHorizontal(15)}}>
        <View style={buttonsWrapper}>
          <PlainButton
          containerStyle={{paddingVertical: 7, borderRadius: 5}}
          textStyle={{color: COLORS.WHITE}}
            onPress={() => {
              console.log('pressed');
            }}>
            Watch Now
          </PlainButton>
          <View style={smallIconsWrapper}>
            <SmallIcon icon="cloud-download-outline" />
            <SmallIcon icon="save-outline" />
            <SmallIcon icon="share-social" />
          </View>
        </View>
        <Genre genres={item.genres} />
        <View style={{marginVertical: pixelSizeVertical(20)}}>
          <Text style={releaseDateStyles}>{item.releaseDate}</Text>
          <Text style={descriptionText}>{item.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailedMovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  posterWrapper: {
    height: height * 0.3,
    width: width,
  },
  posterStyles: {
    height: height * 0.3,
    width: width,
    resizeMode: 'stretch',
  },
  backbuttonWrapper: {
    position: 'absolute',
    left: pixelSizeHorizontal(15),
    top: pixelSizeHorizontal(15),
    height: heightPixel(40),
    width: heightPixel(40),
    zIndex: 999,
  },
  backbuttonStyles: {
    height: '100%',
    width: '100%',
    tintColor: COLORS.TEXT_PRIMARY
  },
  imdbText: {
    color: COLORS.TEXT_PRIMARY, 
    fontWeight: 'bold'
},
movieTitleWrapper: {
    position: 'absolute', 
    bottom: pixelSizeVertical(10), 
    left: pixelSizeHorizontal(15)
},
  movieTitle: {
    fontSize: fontPixel(26),
    color: COLORS.WHITE,
    fontWeight: 'bold',
    marginVertical: pixelSizeVertical(10),
  },
  pressedItem: {
    opacity: 0.5,
  },
  smallIconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: pixelSizeVertical(20),
  },
  descriptionText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontPixel(18),
    marginVertical: pixelSizeVertical(7),
  },
  releaseDateStyles: {
    color: COLORS.SURFACE,
    fontSize: fontPixel(18),
    fontWeight: '800',
  },
  smallIconButton: {
    padding: 7,
    borderRadius: 30,
    backgroundColor: COLORS.WHITE,
    marginLeft: pixelSizeHorizontal(10),
  },
  imdbStyles: {
    backgroundColor: '#FFF700',
    paddingHorizontal: 3,
    borderRadius: 3,
    marginRight: pixelSizeHorizontal(5),
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: '100%',
  },
});
