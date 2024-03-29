import {Dimensions, PixelRatio} from 'react-native';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const frame = {height: 812, width: 375}; // Frame according to figma design

const widthBaseScale = screenWidth / frame.width;
const heightBaseScale = screenHeight / frame.height;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for width  pixel
const widthPixel = (size: number) => normalize(size, 'width');
// for height  pixel
const heightPixel = (size: number) => normalize(size, 'height');
// for font  pixel
const fontPixel = (size: number) => heightPixel(size);

const heightPercentageToDP = (heightPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elementHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : Number.parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elementHeight) / 100);
};
const widthPercentageToDP = (widthPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elementWidth =
    typeof widthPercent === 'number'
      ? widthPercent
      : Number.parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elementWidth) / 100);
};

const FADE_IN = {
  from: {
    opacity: 0,
    scale: 1,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
};

export {
  FADE_IN,
  fontPixel as fp,
  heightPixel as hp,
  heightPercentageToDP as hptdp,
  screenHeight,
  screenWidth,
  widthPixel as wp,
  widthPercentageToDP as wptdp,
};
