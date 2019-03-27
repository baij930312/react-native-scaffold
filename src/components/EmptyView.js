import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    View,
    StyleSheet, Text
} from 'react-native';

import {Metrics,Colors} from "../themes";


export default class EmptyView extends React.Component {

    static propTypes = {
        emptyImage: PropTypes.number.isRequired,
        emptyDes: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Image style={{marginTop: 75}} source={this.props.emptyImage}/>*/}
                <Text style={styles.normalText}>{this.props.emptyDes}~</Text>
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
        color: Colors.font3,
        marginTop: 15,
    }
});