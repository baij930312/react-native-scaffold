/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/18
 *
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LargeList } from "react-native-largelist-v3";
import {ChineseNormalFooter, ChineseNormalHeader, CommonLottieFooter} from "react-native-spring-scrollview/Customize";
import PropTypes from "prop-types";
import { LoadingFooter } from "react-native-spring-scrollview/LoadingFooter";
import {Styles} from "../themes";
import EmptyView from "./EmptyView";

export default class RefreshListView extends React.Component {
    static propTypes = {
        renderItem: PropTypes.func.isRequired,
        heightForIndexPath: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        data: PropTypes.array,
        total:PropTypes.number,
        pageSize:PropTypes.number,
    };

    constructor(props) {
        super(props);
        this._list = LargeList;
        this._isLoading = false;
    }


    render() {
        const data = [{items:(this.props.data?this.props.data:[])}];
        let canLoadMore = this.props.total > this.props.data.length;
        return (
            (this.props.data.length === 0)
                ?
                <EmptyView/>
                :
                <LargeList
                    {...this.props}
                    data={data}
                    ref={ref => (this._list = ref)}
                    heightForIndexPath={this.props.heightForIndexPath}
                    renderIndexPath={({ section: section, row: row })=>this.props.renderItem({item:this.props.data[row],index:row})}
                    refreshHeader={ChineseNormalHeader}
                    loadingFooter={canLoadMore?ChineseNormalFooter:NoMoreFooter}
                    showsVerticalScrollIndicator={false}
                    onRefresh={this._onRefresh}
                    onLoading={this._onLoading}
                />

        );
    }

    _onRefresh = async () => {
        let{pageSize} = this.props;
        pageSize = pageSize?pageSize:10
        if (this._isLoading){
            this._list.endRefresh();
            return ;
        }
        this._isLoading = true;
        await  this.props.onRefresh(1,pageSize);
        this._isLoading = false;
        this._list.endRefresh()
    };

    _onLoading = async () => {
        let{pageSize,total} = this.props;
        pageSize = pageSize?pageSize:10
        let canLoadMore = total > this.props.data.length;
        let pageNum = 1;
        for (let i = 1; i <= total/pageSize; i++) {
            if ( i * pageSize  > this.props.data.length){
                pageNum= i;
                break;
            }
        }
        if (!canLoadMore) {
            setTimeout(() => this._list.endLoading(), 500);
            return;
        }
        if (this._isLoading){
            this._list.endLoading();
            return ;
        }
        this._isLoading = true;
        await  this.props.onLoadMore(pageNum,pageSize);
        this._isLoading = false;
        this._list.endLoading()
    };
}

class NoMoreFooter extends LoadingFooter{
    static style:string = "stickyContent";

    render() {
        return(
            <View style={[Styles.center,Styles.flex1]}>
                <Text>没有更多数据</Text>
            </View>
        );
    }
}
