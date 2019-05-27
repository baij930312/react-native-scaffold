/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, SectionList, View} from 'react-native';
import {Styles} from "../../themes";
import {H,} from "../../common/Utils";
import {Echarts, echarts} from 'react-native-secharts';



var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';

var dataCount = 2e2;
var data = generateOHLC(dataCount);

var option4 = {
    dataset: {
        source: data
    },
    title: {
        // text: 'Data Amount: ' + echarts.format.addCommas(dataCount)
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
            var obj = {top: 10};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        }
    },

    axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
            backgroundColor: '#777'
        }
    },

    // toolbox: {
    //     feature: {
    //         dataZoom: {
    //             yAxisIndex: true
    //         },
    //     }
    // },
    grid: [
        {
            left: '10%',
            right: '2%',
            bottom: 100
        },
        {
            left: '10%',
            right: '2%',
            height: 80,
            bottom: 0
        }
    ],
    xAxis: [
        {
            type: 'category',
            scale: true,
            boundaryGap : false,
            // inverse: true,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        {
            type: 'category',
            gridIndex: 1,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
    ],
    //底部缩放条
    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 10,
            end: 100
        },
        {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            bottom: 10,
            start: 10,
            end: 100,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '105%'
        }
    ],
    //底部valume
    visualMap: {
        show: false,
        seriesIndex: 1,
        dimension: 6,
        pieces: [{
            value: 1,
            color: upColor
        }, {
            value: -1,
            color: downColor
        }]
    },
    series: [
        {
            type: 'candlestick',
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
            },
            encode: {
                x: 0,
                y: [1, 4, 3, 2]
            }
        },
        {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                color: '#7fbe9e'
            },
            large: true,
            encode: {
                x: 0,
                y: 5
            }
        }
    ]
};

function generateOHLC(count) {
    var data = [];

    var xValue = +new Date(2011, 0, 1);
    var minute = 60 * 1000;
    var baseValue = Math.random() * 12000;
    var boxVals = new Array(4);
    var dayRange = 12;

    for (var i = 0; i < count; i++) {
        baseValue = baseValue + Math.random() * 20 - 10;

        for (var j = 0; j < 4; j++) {
            boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
        }
        boxVals.sort();

        var idxRandom = Math.random();
        var openIdx = Math.round(Math.random() * 3);
        var closeIdx = Math.round(Math.random() * 2);
        if (closeIdx === openIdx) {
            closeIdx++;
        }
        var volumn = boxVals[3] * (1000 + Math.random() * 500);

        // ['open', 'close', 'lowest', 'highest', 'volumn']
        // [1, 4, 3, 2]
        data[i] = [
            echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', xValue += minute),
            +boxVals[openIdx].toFixed(2), // open
            +boxVals[3].toFixed(2), // highest
            +boxVals[0].toFixed(2), // lowest
            +boxVals[closeIdx].toFixed(2),  // close
            volumn.toFixed(0),
            getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
        ];
    }

    return data;

    function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
        var sign;
        if (openVal > closeVal) {
            sign = -1;
        }
        else if (openVal < closeVal) {
            sign = 1;
        }
        else {
            sign = dataIndex > 0
                // If close === open, compare with close of last record
                ? (data[dataIndex - 1][closeDimIdx] <= closeVal ? 1 : -1)
                // No record of previous, set to be positive
                : 1;
        }

        return sign;
    }
}


export default class Home1 extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home123',
        };
    };

    render() {
        let ws = new WebSocket('ws://host.com/path');
        ws.onopen = () => {
            // connection opened
            ws.send('something'); // send a message
        };

        ws.onmessage = (e) => {
            // a message was received
            console.log(e.data);
        };

        ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
        };

        ws.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
        };
        return (
            <View style={styles.container}>
                {/*<View><Echarts ref="echarts1" option={this.state.option1} onPress={this.onPress} height={300} /></View>*/}
                <View><Echarts ref="echarts2" option={option4} height={400} /></View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
