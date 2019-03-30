


export default {
    namespace: 'global',
    state: {
        aa:0,
    },
    effects: {

        *aaa({ payload }, { put, select ,take}) {

        },
    },
    reducers: {
        add(state, action) {
            return {
                aa: state.aa+1,
            };
        },
    },
}