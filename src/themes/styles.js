import { StyleSheet,StatusBar} from 'react-native';
import {H} from "../common/utils";

// export const SelectStyle = ({ios, android, ...common}: ViewPropTypes.styles) => {
//     const ps = Platform.OS === 'ios' ? ios : android;
//     return {
//         ...common,
//         ...ps,
//     };
// };

export default  StyleSheet.create({
    //横向布局
    rowContainer: {
        flexDirection:'row',
        alignItems:'center',
    },
    //纵向布局
    columnContainer: {
        flexDirection:'column',
    },
    //占满父布局
    fullParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    //导航栏样式
    navBarStyle:{
        paddingTop: StatusBar.currentHeight,
        height: StatusBar.currentHeight + 44 ,
        backgroundColor: 'red',
        borderBottomColor: '#ccc',
    }
});
