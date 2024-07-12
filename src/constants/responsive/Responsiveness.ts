import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 320;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width
export const widthPixel = (size: number) => {
  return normalize(size, 'width');
};

//for height
export const heightPixel = (size: number) => {
  return normalize(size, 'height');
};
//for font
export const fontPixel = (size: number) => {
  return heightPixel(size);
};
//for vertical Margin and Padding
export const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};
//for horizontal Margin and Padding
export const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};
