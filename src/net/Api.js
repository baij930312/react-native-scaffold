import {ApiAgent} from './Agent';

export default {
    login: async (uid, type) => {
        return ApiAgent.call('/user/login/login', {
            uid,
            type,
        });
    },
}