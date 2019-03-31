import React, { Component } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './tabbar'


import Home from '../home/home1'
import Two from '../home/home2'

//模块名
let tabNames = ['Home', 'Tab2',];
//图片
let tabIconNames = ['ios-paper', 'ios-albums' ];
//模块对应页面
let tabs = [Home, Two, ];

export default class Tab extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        if (!params){
            //初始状态  暂时如此实现
            return Home.navigationOptions({ navigation, navigationOptions });
        }
        if (typeof params.navOptions === 'function'){
            return params.navOptions({ navigation, navigationOptions })
        } else {
            return typeof params.navOptions;
        }
    };

    render() {
        return (
            <ScrollableTabView
                tabBarPosition='bottom'       //导航位置
                initialPage={0}               //初始化选中
                renderTabBar={() => <TabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
                onChangeTab={(data) => {        //当改变选项卡时候触发的毁掉函数data里有俩参数 i ref
                    this.props.navigation.setParams({navOptions : tabs[data.i].navigationOptions})
                }}
            >
                {tabs.map((Page,i)=> <Page tabLabel={tabNames[i]} {...this.props}/>)}
            </ScrollableTabView>
        )
    }
}
