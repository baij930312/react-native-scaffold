import AsyncStorage from '@react-native-community/async-storage';
import { persistStore } from 'redux-persist';
import Immutable from 'seamless-immutable';


const immutableTransform = {
    // Retrieving state from storage.
    out: (state: Object) => {
        return Immutable(state);
    },
    // Persist state into storage.
    in: (raw: Object) => {
        if (raw.asMutable) {
            return raw.asMutable({deep: true});
        }
        return raw;
    },
};

//redux持久化配置
class ReduxPersist {

    // active = true;
    reducerVersion = '1';
    storeConfig = {
        storage: AsyncStorage,
        blacklist: [],
        whitelist: [
            'global',
        ],
        transforms: [
            immutableTransform,
        ],
    };

    updateReducers(store) {
        const version = this.reducerVersion;
        const config = this.storeConfig;
        const onFinish = () => {
            console.log('Persist service started.');
        };
        AsyncStorage.getItem('reducerVersion').then(localVersion => {
            if (version !== localVersion) {
                console.warn(`Reducer Version Change Detected[${localVersion} => ${version}], Purging...`);
                persistStore(store, config, onFinish).purge();
                AsyncStorage.setItem('reducerVersion', version);
            } else {
                persistStore(store, config, onFinish);
            }
        }).catch(() => {
            persistStore(store, config, onFinish);
            AsyncStorage.setItem('reducerVersion', version);
        });
    }
}

export default new ReduxPersist();
