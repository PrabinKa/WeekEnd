import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Dimensions, Animated} from 'react-native';
import {getMovies} from '../../services';
import {Loader, PlainButton, TabHeader} from '../../components';
import {SafeAreaView} from 'react-native';
import {COLORS, pixelSizeVertical} from '../../constants';

const {height, width} = Dimensions.get('window');

const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  rating: number;
  actors: string[];
  awards: string;
  boxOffice: string;
  country: string;
  genre: string[];
  language: string;
  plot: string;
  poster: string;
  production: string;
  runtime: number;
  trailer: string;
  website: string;
}

interface MovieCrouselProps {
  navigation: any;
}

const MovieCrousel: React.FC<MovieCrouselProps> = ({navigation}) => {
  const {
    container,
    carouselContainer,
    outerImageWrapper,
    imageWrapper,
    imageStyles,
  } = styles;
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [moviesCollection, setMoviesCollection] = useState<Movie[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    setIsloading(true);
    try {
      await getMovies().then(data => {
        setMoviesCollection(data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <TabHeader navigation={navigation}>
      <View style={container}>
        {moviesCollection && (
          <Animated.FlatList
            data={moviesCollection}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            keyExtractor={(item, index) => `${item.id}movies${index}`}
            renderItem={({item, index}) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const translateX = scrollX.interpolate({
                inputRange,
                outputRange: [-width * 0.7, 0, width * 0.7],
              });
              return (
                <View style={carouselContainer}>
                  <View style={outerImageWrapper}>
                    <View style={imageWrapper}>
                      <Animated.Image
                        source={{uri: item.poster}}
                        style={[
                          imageStyles,
                          {
                            transform: [
                              {
                                translateX,
                              },
                            ],
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <View>
                    <PlainButton
                      onPress={() => {
                        navigation.navigate('Detail', {item});
                      }}
                      containerStyle={{
                        marginVertical: pixelSizeVertical(30),
                        paddingVertical: pixelSizeVertical(7),
                        borderRadius: 5,
                      }}
                      textStyle={{
                        color: COLORS.WHITE,
                      }}>
                      View
                    </PlainButton>
                  </View>
                </View>
              );
            }}
          />
        )}
        <Loader isLoading={isLoading} />
      </View>
    </TabHeader>
  );
};

export default MovieCrousel;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.BACKGROUND,
  },
  carouselContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerImageWrapper: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.WHITE,
    elevation: 13,
  },
  imageWrapper: {
    width: ITEM_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageStyles: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH * 1.4,
    resizeMode: 'cover',
  },
});
