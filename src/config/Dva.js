import React from 'react';
import { create } from 'dva-core';
import models from "../models";
import {autoRehydrate} from 'redux-persist';

import {connect} from "react-redux";
import ReduxPersistConfig from './ReduxPersist';

export { connect };

export  default  () => {
    const app = create({
        onError(e) {
            console.log('onError', e);
        },
        models: [...models],
        extraEnhancers:[autoRehydrate()],
    });

    models.forEach(model => app.model(model));

    app.start();

    ReduxPersistConfig.updateReducers( app._store);
    const store = app._store;
    app.getStore = () => store;

    return app;
};

