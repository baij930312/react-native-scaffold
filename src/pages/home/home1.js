/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Styles} from "../../themes";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


export default class Home1 extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home123',
        };
    };

    render() {
        return (
            <View style={Styles.rowContainer}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate({
                        routeName:'Home2'
                    })
                    console.log(this.props);
                }}><Text>'asdsadsadas'</Text></TouchableOpacity>
                <Text style={styles.welcome}>home</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
