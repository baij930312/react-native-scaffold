import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Metrics } from '../../themes'
//动画
let AnimatedValues = [new Animated.Value(0.9), new Animated.Value(0.9), new Animated.Value(0.9), new Animated.Value(0.9)];

export  default  class TabBar extends Component {

    // 1.声明所需要的属性
    static propTypes = {

        /**
         * 框架内帮我们回调
         */
        goToPage: PropTypes.func,// 跳转到对应tab
        activeTab: PropTypes.number,// 当前被选中的Tab下标
        tabs: PropTypes.array, // 所有Tab的集合

        /**
         * 需要自己调用
         */
        tabNames: PropTypes.array, // 保存Tab名称
        tabIconNames: PropTypes.array, // 保存Tab图标
    }

    constructor(props) {
        super(props)

        this.state = {
            AnimatedValues: AnimatedValues
        };

    }


    /**
     * tab切换的时候有动画效果
     */
    startAnimation = (key) => {
        this.state.AnimatedValues[key].setValue(1.1);
        Animated.spring(this.state.AnimatedValues[key],
            {
                toValue: 0.9,
                friction: 1,
            }
        ).start();
    }

    //点击切换tab
    clickTab = (tab, i) => {
        const {goToPage} = this.props
        this.startAnimation(i)
        goToPage(i)

    }

    renderTabOption(tab, i) {
        const color = this.props.activeTab === i ? "green" : "#c0c0c0"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity key={i} onPress={() => { this.clickTab(tab, i) }} >
                <View style={styles.tabBox}>

                    <Animated.View
                        style={{
                            transform: [
                                { scale: this.state.AnimatedValues[i] }
                            ]
                        }}>

                        <Icon
                            name={this.props.tabIconNames[i]}  // 图标
                            size={30}
                            color={color}
                        />
                    </Animated.View>

                    <Text style={{ color: color }}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {

        return (
            <View style={styles.tabRow}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    tabRow: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tabBox: {
        width: Metrics.screenWidth / 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }


});
