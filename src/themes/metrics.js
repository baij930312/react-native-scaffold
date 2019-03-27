import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

const {width, height} = Dimensions.get('screen');


export default {
    onePixel: 1 / PixelRatio.get(),
    smallMargin: 5,
    baseMargin: 10,
    mediumMargin: 16,
    doubleBaseMargin: 20,
    largeMargin: 30,
    borderWidth: 2,
    screenWidth: width,
    screenHeight:height,
    fontSize: {
        title: 18,
        primaryTitle: 16,
        large: 15,
        normal: 14,
        medium: 13,
        small: 12,
        tiny: 11,
    },
    isIos:Platform.OS === 'ios',
    isAndroid:Platform.OS === 'android',
}
