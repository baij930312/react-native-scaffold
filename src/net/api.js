import {ApiAgent} from './agent';

export default {
    login: async (uid, type) => {
        return ApiAgent.call('/user/login/login', {
            uid,
            type,
        });
    },
}