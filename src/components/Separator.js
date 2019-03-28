import React from 'react';
import  PropTypes  from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import {W} from "../themes/screeUtils";

//分割线
export default class Separator extends React.Component {

    static propTypes = {
        height: PropTypes.number,//高度默认1px
        paddingLeft: PropTypes.number,
        paddingRight: PropTypes.number,
        color: PropTypes.string,
    };

    render() {
        const height = this.props.height || W(1);
        const paddingLeft = this.props.paddingLeft ||0;
        const paddingRight = this.props.paddingRight || 0;
        const color = this.props.color || '#000';

        return (
            <View style={{paddingLeft,paddingRight,height,width: '100%',backgroundColor:'transparent'}}>
                <View style={{backgroundColor:color,flex:1}}/>
            </View>
        );
    }
}
