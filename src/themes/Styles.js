import { StyleSheet,StatusBar} from 'react-native';
import {Metrics} from "./";

export const SelectStyle = ({ios, android, ...common}) => {
    const ps = Platform.OS === 'ios' ? ios : android;
    return {
        ...common,
        ...ps,
    };
};

export default  StyleSheet.create({
    //横向布局
    row: {
        flexDirection:'row',
    },
    //纵向布局
    column: {
        flexDirection:'column',
    },
    //居中布局
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    //flex 1
    flex1:{
        flex: 1,
    },
    //绝对布局占满父布局
    absoluteFullParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    //导航栏样式
    navBarStyle:{
        paddingTop: Metrics.isAndroid? StatusBar.currentHeight:0,
        height: (Metrics.isAndroid? StatusBar.currentHeight:0) + 44 ,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
    },
    //当不需要导航栏时 的安全区样式
    safeNavBarStyle:{
        paddingTop: Metrics.isAndroid? StatusBar.currentHeight:0,
        height: Metrics.isAndroid? StatusBar.currentHeight:0 ,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
    },
    //底部导航样式
    tabBarStyle: {
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
