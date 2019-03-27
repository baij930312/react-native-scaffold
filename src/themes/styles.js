import { StyleSheet} from 'react-native';

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
    fullParent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
