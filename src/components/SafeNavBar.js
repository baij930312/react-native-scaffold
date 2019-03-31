import React from "react";
import {View, StyleSheet,StatusBar} from 'react-native';

export default class SafeNavBar extends React.Component {

    render() {
        return (
            <View style={styles.container } />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: StatusBar.currentHeight,
        backgroundColor:'transparent',
    },

});