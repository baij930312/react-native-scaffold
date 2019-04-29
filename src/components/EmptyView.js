import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Metrics} from "../themes";
import {H, SP} from "../common/utils";
import images from "../themes/images";
import Styles from "../themes/styles";


export default class EmptyView extends React.Component {

    static propTypes = {
        emptyImage: PropTypes.number,
        emptyDesc: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {emptyDesc ,emptyImage} = this.props;
        return (
            <View style={Styles.center}>
                <Image style={styles.image} source={emptyImage || {uri:images.dummy_image()}}/>
                <Text style={styles.normalText}>{ emptyDesc||'暂无记录'}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center'
    },
    normalText: {
        fontSize: Metrics.fontSize.large,
        marginTop: H(15),
        fontWeight:'400',
        color:'rgba(102,102,102,1)',
        lineHeight:SP(17),
    },
    image:{
        marginTop: H(60),
        height:100,
        width:70,
    }
});