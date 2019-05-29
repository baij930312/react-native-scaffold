import {createAppContainer,createStackNavigator,
    createBottomTabNavigator,createMaterialTopTabNavigator
} from "react-navigation";

import React from "react";
import {Styles} from "../themes";
import HomeStack from "./HomeStack";

//底部导航配置
const tabRouteConfigMap = {
    home: {
        screen: HomeStack,

        },
};

//底部导航
const Tab = createBottomTabNavigator(tabRouteConfigMap, {
        initialRouteName: 'home',
        tabBarPosition: 'bottom',
        lazy: true,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: '#E7BF62',
            inactiveTintColor:'#858587',
            style: Styles.tabBarStyle,
        }
    }
);



export default createAppContainer(Tab);