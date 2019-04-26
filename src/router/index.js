import {createAppContainer,createStackNavigator,
    createBottomTabNavigator,createMaterialTopTabNavigator
} from "react-navigation";
import Home from "../pages/home";
import Home1 from "../pages/home/home1";
import React from "react";
import Home2 from "../pages/home/home2";
import {Styles} from "../themes";

const tabRouteConfigMap = {
    Home: {
        screen: Home1,
        navigationOptions: () => ({
            title:'home',
            headerStyle: Styles.navBarStyle,
            headerTintColor: 'red',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            tabBarLabel: '首页',
        })
    },
    Find: {
        screen: Home2,
        navigationOptions: () => ({
            title:'find',
            tabBarLabel: '发现',
        })
    }
};


const Tab = createBottomTabNavigator(tabRouteConfigMap, {
        initialRouteName: 'Find',
        tabBarPosition: 'bottom',
        lazy: true,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: 'red',
            style: {
                backgroundColor: '#fff',
            },
        }
    }
);

const mainStack = createStackNavigator({

        Tab:{
            screen: Tab,
            navigationOptions: ({ navigation }) => {
                const { routes, index } = navigation.state;
                const key =  routes[index].key;
                return tabRouteConfigMap[key].navigationOptions();
            }
        },
        Home1:Home,
        Home2:Home2,
    },
    {
        defaultNavigationOptions:({ navigation }) => {
            console.log(navigation);
            return {
                // title: 'Home',
                headerStyle: Styles.navBarStyle,
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            };
        },
    },
);


export default createAppContainer(mainStack);