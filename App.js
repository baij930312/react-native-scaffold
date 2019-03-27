import * as React from 'react';
import { Provider } from 'react-redux';
import dva from "./src/common/dva";
import App from './src/router'
import {SafeAreaView} from "react-navigation";

export default class Container extends React.Component {
   render() {
       console.log(dva().getStore().getState());
       return (
        <Provider store={dva().getStore()}>
            {/*<SafeAreaView style={{flex:1}}>*/}
                <App/>
            {/*</SafeAreaView>*/}
        </Provider>
    );
  }
}
