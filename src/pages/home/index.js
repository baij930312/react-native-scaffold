/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {commonStyles} from "../../common/styles";
import {connect} from "react-redux";
import AliIcon from "../../common/aliIcons/aliIcon";



const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

@connect(({ global }) => ({
    global,
}))
 export default  class Home extends Component {

    static navigationOptions = {
        title: '111',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    componentDidMount(){
        console.log(this.props,12312312);
        // this.props.navigation.setParams({title: '识兔'});

    }

    render() {
        console.log(this.props);

        return (
            <View style={commonStyles.rowContainer}>
                <AliIcon name='gonggao' size={20} color="red"/>

                <View style={{marginTop:10}}>
                    {/*<FontAwesome.Button name="BTC" backgroundColor="#3b5998">*/}
                        {/*<Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>*/}
                    {/*</FontAwesome.Button>*/}


                    {/*<FontAwesome name='user' size={20} color={'#00ff00'}/>*/}

                    {/*<FontAwesome name="rocket" size={30} color="#900" />*/}

                    {/*<Text>图标展示<FontAwesome name={'facebook'} color={'red'} size={20}/></Text>*/}
                </View>
                <TouchableOpacity onPress={()=>{
                    this.props.dispatch({type:'global/add'})
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

