import React from 'react';
import  PropTypes  from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import {W,H} from "../common/Utils";

//分割线
export default class Separator extends React.Component {

    static propTypes = {
        length: PropTypes.number,//高度默认1px
        startPadding: PropTypes.number,
        endPadding: PropTypes.number,
        direction: PropTypes.number,//0 横向  1 竖向
        color: PropTypes.string,
    };

    render() {
        const length = this.props.length || H(1);
        const startPadding = this.props.startPadding ||0;
        const endPadding = this.props.endPadding || 0;
        const color = this.props.color || '#000';
        const direction = this.props.direction || 0;

        return (
            (direction === 0)
                    ?
                    <View style={{paddingLeft:startPadding, paddingRight:endPadding,height:length,width: '100%',backgroundColor:'transparent'}}>
                        <View style={{backgroundColor:color,flex:1}}/>
                    </View>

                    :
                    <View style={{paddingTop:startPadding,paddingBottom:endPadding,width:length,height: '100%',backgroundColor:'transparent'}}>
                        <View style={{backgroundColor:color,flex:1}}/>
                    </View>

        )

    }
}
