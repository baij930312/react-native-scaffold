import {createAppContainer,createStackNavigator} from "react-navigation";
import Home from "../pages/home";
import Home1 from "../pages/home/home1";
import React from "react";
import Home2 from "../pages/home/home2";
import Tab from "../pages/tab/tabPage";
import {Styles} from "../themes";


const mainStack = createStackNavigator({
        Tab:Tab,
        Home1:Home,
        Home2:Home2,
    },
    {
        defaultNavigationOptions:({ navigation }) => {
            console.log(navigation);
            return {
                // title: 'Home',
                headerStyle: Styles.navBarStyle,
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            };
        },
    },
    );


export default createAppContainer(mainStack);