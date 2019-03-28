


export default {
    namespace: 'global',
    state: {
        aa:0,
    },
    effects: {

    },
    reducers: {
        add(state, action) {
            return {
                aa: state.aa+1,
            };
        },
    },
}