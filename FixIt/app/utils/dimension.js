import {Dimensions} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const calcScale = (value) => {
  const baseHeight = 812;
  const baseWidth = 375;

  const scaleWidth = width / baseWidth;
  const scaleHeight = height / baseHeight;
  let scale = Math.min(scaleWidth, scaleHeight);
  scale = scale > 1 ? 1 : scale;

  return Math.ceil(value * scale);
};
