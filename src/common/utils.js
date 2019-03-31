import {I18n} from '../language/i18n'

import {PixelRatio, Dimensions, NativeModules} from 'react-native';

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
let fontScale = PixelRatio.getFontScale();
let pixelRatio = PixelRatio.get();

// 根据dp获取屏幕的px
let screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenW);
let screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenH);

// 高保真的宽高
const designWidth = 750.0;
const designHeight = 1334.0;

//原生模块
const {RNToolsModule} = NativeModules;


/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export function SP(size:Number) {

    let scaleWidth = screenW / designWidth;
    let scaleHeight = screenH / designHeight;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale/fontScale + 0.5);
    return size;
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export function H(size:Number) {
    let scaleHeight = size * screenPxH / designHeight;
    size = Math.round((scaleHeight / pixelRatio + 0.5));
    return size;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export function W(size:Number) {
    let scaleWidth = size * screenPxW / designWidth;
    size = Math.round((scaleWidth/pixelRatio + 0.5));
    return size;
}

//多语言支持
export function T(string){
    return I18n.t(string||'')
}


export  default {
    //原生显示toast
    showNativeToast(text){
        RNToolsModule.showToast(text||'', RNToolsModule['TOAST_SHORT']);
    }
}