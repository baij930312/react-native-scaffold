


export default {
    namespace: 'global',
    state: {
        aa:0,
    },
    effects: {

    },
    reducers: {
        add(state, action) {
            console.log(123);
            return {
                aa: state.aa+1,
            };
        },
    },
}