import * as React from 'react';
import { Provider } from 'react-redux';
import dva from "./src/config/dva";
import App from './src/router'
import {SafeAreaView} from "react-navigation";
import {Alert, StatusBar} from "react-native";

export default class Container extends React.Component {
   render() {
       return (
        <Provider store={dva().getStore()}>
            <StatusBar
                hidden={false}
                translucent={true}/>
            <App screenProps={{ statusBarHeight: StatusBar.currentHeight}} />
        </Provider>
    );
  }
}
