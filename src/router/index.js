import {createAppContainer, createBottomTabNavigator,createStackNavigator,SafeAreaView} from "react-navigation";
import Home from "../pages/home";
import Home1 from "../pages/home/home1";
import {Text,View} from "react-native";
import React from "react";
import Home2 from "../pages/home/home2";

const tab1 = createBottomTabNavigator({
    aaa:{
        screen:createStackNavigator({Home}),

    },
    Home2:createStackNavigator({Home2}),
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            // let IconComponent = Ionicons;
            // let iconName;
            // if (routeName === 'Home') {
            //     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            //     // Sometimes we want to add badges to some icons.
            //     // You can check the implementation below.
            //     IconComponent = HomeIconWithBadge;
            // } else if (routeName === 'Settings') {
            //     iconName = `ios-options`;
            // }

            // You can return any component that you like here!
            return <View><Text>{'asdsadasd'}</Text></View>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
},);
const mainStack = createStackNavigator({
    tab:{
        screen:tab1,

        navigationOptions:()=>{
            return {
                // title: 'Home1',
                header: <View />,
            }
        }

    },

        Home1:{
            screen:Home1,
            navigationOptions:()=>{
                return {
                    title: 'Home1',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: '#000',
                    headerMode: 'none',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }
            }
        },

    },
    {
        defaultNavigationOptions:({ navigation,navigationOptions }) => {
            console.log(navigationOptions);
            return {
                title: 'Home',

                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            };
        },
    },
    );


export default createAppContainer(mainStack);