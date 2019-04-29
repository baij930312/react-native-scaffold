/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ListView, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Metrics, Styles} from "../../themes";
import RefreshListView from "../../components/RefreshListView";
import {AlertView, LoadingHOC} from "../../components";
import AliIcon from "./index";
import { Tooltip, Text } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from "react-native-actionsheet";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Swipeout from 'react-native-swipeout';
import Utils from "../../common/utils";
import {Dropdown} from "react-native-material-dropdown";
import EmptyView from "../../components/EmptyView";
import Picker from "react-native-picker";



@LoadingHOC
export default class Home2 extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <Tooltip height={100} withOverlay={false}  popover={<View>
                <TouchableOpacity><Text>aaaa</Text></TouchableOpacity>
                <TouchableOpacity><Text>aaaa</Text></TouchableOpacity>
                <TouchableOpacity><Text>aaaa</Text></TouchableOpacity>
                <TouchableOpacity><Text>aaaa</Text></TouchableOpacity>
            </View>} containerStyle={{marginRight:200}} backgroundColor={'#eee'}>
                <Text >Press me</Text>

            </Tooltip>
        };
    };
    constructor(){
        super();

        this.state = {
            data : []
        };
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }


    _renderItem ({item, index}) {
        return (
            <View style={{flex:1}}>
                <Text style={{height:200,width:200,backgroundColor:'#666'}}>{ index}</Text>
            </View>
        );
    }

    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerTitleText: ' ',
            pickerCancelBtnText: '   取消',
            pickerConfirmBtnText: '确定   ',
            pickerToolBarBg: [255, 255, 255, 1],
            pickerCancelBtnColor:[219,172,70,1],
            pickerConfirmBtnColor:[219,172,70,1],
            pickerBg: [255, 255, 255, 1],
            pickerFontColor: [0, 0 ,0, 1],

            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },

        });
        Picker.show();
        Picker.select(['2018年','2月','2日'])
    }

    render() {
        var btnsTypes = [
            { text: 'Delete',     right: [
                    {

                        text: 'Button',
                        backgroundColor: '#4fba8a',
                        color: '#17807a',
                        underlayColor: "#006fff",
                    }
                ],   }
        ];

        let data = [{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        },{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        }];


        return (
            <View style={styles.container}>
                <Dropdown
                    label='Select'
                    containerStyle={{width: 200}}
                    data={data}
                />
                <AlertView key={'alert'} ref={o => this.alert = o}
                           visible={true}
                           title={'哈哈哈'}
                           actions={[
                               {text:'123',click:()=>{
                                       console.log(111);
                                   },style:{color:'red'}},
                               {text:'123'}
                           ]}
                />
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={[1,2,3,45,6]}
                    renderItem={this._renderItem}
                    sliderWidth={Metrics.screenWidth}
                    layout={'default'}
                    itemWidth={Metrics.screenWidth -200}
                >
                    {/*<Pagination />*/}
                </Carousel>
                <View>
                    <Text onPress={()=>{Utils.showNativeToast('asdsadsad')}}>Open ActionSheet</Text>
                    <Text onPress={()=>{this.alert.show()}}>show alert</Text>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={'Which one do you like ?'}
                        options={['Apple', 'Banana', 'cancel']}
                        cancelButtonIndex={2}
                        destructiveButtonIndex={1}
                        onPress={(index) => { /* do something */ }}
                    />
                </View>

                <RefreshListView
                    renderItem={({ item, index })=>{
                        console.log(item);
                        return (
                            <Swipeout style={{height: 44}} right={btnsTypes}>

                                <Text  style={{height: 44}}>Swipe me left</Text>

                            </Swipeout>
                        );
                    }}
                    data={this.state.data}
                    onLoadMore={(pageNum,pageSize)=>{
                        console.log(pageSize);
                        return new Promise((resolve)=>{
                            setTimeout(()=>{
                                resolve(1111)
                                this.setState({
                                    data:[1,2,3,1,2,3,1,2,3,1,123,123,123,123,123].concat(this.state.data)
                                })

                            },1000);
                        })
                    }}
                    onRefresh={(pageNum,pageSize)=>{
                        console.log(pageSize);
                        return new Promise((resolve)=>{
                            setTimeout(()=>{
                                resolve(1111)
                                this.setState({
                                    data:[1,2,3,1,2,3,1,2,3,1,1,1,1,1]
                                })
                            },1000);


                        })
                    }}
                    total={20}
                    heightForIndexPath={()=>44}/>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => this.showActionSheet()}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {this._showDatePicker()}}>
                        <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        // textAlign: 'center',
        margin: 10,
        flex:1,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
