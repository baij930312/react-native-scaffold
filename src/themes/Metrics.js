import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

const {width, height} = Dimensions.get('screen');


export default {
    onePixel: 1 / PixelRatio.get(),//根据密度获取1px
    smallMargin: 5,//常用边距
    baseMargin: 10,
    mediumMargin: 16,
    doubleBaseMargin: 20,
    largeMargin: 30,
    borderWidth: 2,
    screenWidth: width,//屏幕宽度
    screenHeight:height,//屏幕高度
    fontSize: {  //常用字体大小
        title: 18,
        primaryTitle: 16,
        large: 15,
        normal: 14,
        medium: 13,
        small: 12,
        tiny: 11,
    },
    isIos:Platform.OS === 'ios', //平台判断
    isAndroid:Platform.OS === 'android',
}
