import I18n,{ getLanguages } from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import en from './en'
import zh from './zh'



I18n.defaultLocale = 'zh';

I18n.fallbacks = true;

I18n.translations = {
    en,
    zh,
};

I18n.localeLanguage = () => {

    I18n.locale = DeviceInfo.getDeviceLocale();
    return I18n.locale;

};


export { I18n, getLanguages };