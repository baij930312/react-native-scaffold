
//主路由
import {createStackNavigator} from "react-navigation";
import Home3 from "../pages/Home";
import {Text} from "react-native";
import Home1 from "../pages/Home/Home1";
import React from "react";
import {commonHeaderOptions} from "../themes/Styles";

const HomeStack = createStackNavigator({

        Home1:{
            screen:Home3,
            navigationOptions: ({navigation}) => {
                return {
                    title: navigation.state.params?navigation.state.params.title:'asd',
                    headerRight:!!navigation.state.params ? navigation.state.params.right(): <Text style={{width:20}}>111</Text>,
                    headerLeft:<Text style={{width:200}}>123</Text>,
                };
            }
        },
        Home3: {
            screen: Home1,
            navigationOptions: ({navigation}) => {
                console.log(123123);
                return {
                    title:'123',
                }}
        },

    },
    {
        defaultNavigationOptions:({ navigation }) => {
            return commonHeaderOptions;

        },
    },
);
HomeStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarVisible: navigation.state.index === 0,
        tabBarLabel: '首页',
        // tabBarIcon:({focused}) => (
        //     <TabBarIcon
        //         focused={focused}
        //         name={'car'}
        //         color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
        //     />
        // )

    };
};

export  default  HomeStack;