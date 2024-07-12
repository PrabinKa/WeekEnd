import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { COLORS, fontPixel } from '../../constants';

interface GenreProps {
  genres: string[];
}

const Genre: React.FC<GenreProps> = ({genres}) => {
  const {wrapper, genreWrapper, genreTextStyles} = styles;

  return (
    <View style={wrapper}>
      {genres.map((item, index) => {
        return (
          <View key={index} style={genreWrapper}>
            <Text style={genreTextStyles}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Genre;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    flexWrap: 'wrap',
  },
  genreWrapper: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderColor: COLORS.SURFACE,
    borderWidth: 0.5,
    marginRight: 5,
    borderRadius: 5,
    marginVertical: 5
  },
  genreTextStyles: {
    fontSize: fontPixel(16),
    color: COLORS.ERROR,
    fontWeight: '500'
  },
});
