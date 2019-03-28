import net from "apisauce";
import {md5} from './md5'
import { Alert } from "react-native";

export default class Agent {
    constructor(baseURL, config = {}) {
        const {headers, ...other} = config;
        this._agent = net.create({
            baseURL,
            headers: {
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                ...headers,
            },
            timeout: 10000, // 10 secends.
            ...other,
        });
    }
}

//api 代理
class NetAgent extends Agent {
    static HPP_HOST = '';
    // static APP_KEY = '';
    // static SECRET_KEY = '';

    constructor(config) {
        super(NetAgent.HPP_HOST, config);
        // some global values.
        this.commonParam = {
            uid: null,
        };
    }

    //更新通用参数
    updateCommonParam(uid) {
        this.commonParam.uid = uid;

    }

    authorization = (options) => {
        // let keyValueStr = '';
        // const params = Object.entries(options ? options : {}).reduce((data, [key, value]) => {
        //     if (value !== undefined) {
        //         (data[key] = value);
        //         keyValueStr += key + value;
        //     }
        //     return data;
        // }, {});
        //
        // const timestamp = Math.floor(new Date().getTime() / 1000);
        // const originStr = keyValueStr + 'timestamp' + `${timestamp}` + 'appkey' + HbbAgent.APP_KEY + HbbAgent.SECRET_KEY;
        // params['token'] = md5(encodeURIComponent(originStr.toLowerCase()).toLowerCase().split('').sort().filter(item => item !== ' ').join(''));
        // params['appkey'] = HbbAgent.APP_KEY;
        // params['timestamp'] = timestamp.toString();
        // console.log(params);
        return options;
    };

    call(url, options) {
        options = Object.assign(this.commonParam.uid ?{uid:this.commonParam.uid}:{},options);
        console.log(options);
        const params = this.authorization(options);
        return this._agent.post(url, params, {headers: {'Content-Type': 'application/json'}}).then(resp => {
            // console.log(resp);
            if (!resp.ok) {
                console.log(`Fetch [${url}] error, code: ${resp.status}, ${resp.problem}`);
                return;
            }
            let result = resp.data;
            console.log(result);
            if (result.meta.state !== 'success') {
                console.log(`API [${url}] error, code: ${result.meta.code}, msg: ${result.meta.message}`);
                if (result.meta.message){
                    Alert.alert(
                        "提示", result.meta.message,
                    );
                }
                return false;
            }
            return result.data;
        });
    }
}


export const Agent = new NetAgent();

