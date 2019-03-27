import React from 'react';
import { create } from 'dva-core';
import models from "../models";
import {connect} from "react-redux";

export { connect };

export  default  () => {
    const app = create({
        onError(e) {
            console.log('onError', e);
        },
        models: [...models],
    });

    models.forEach(model => app.model(model));

    app.start();

    const store = app._store;



    app.getStore = () => store;

    return app;
};

