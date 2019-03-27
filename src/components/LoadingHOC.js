import React from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux';


export class LoadingIndicator extends React.Component {
    render() {

        return this.props.loading ? (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator size={this.props.size}/>
                </View>
            </View>
        ) : null;
    }
}

export default (WrappedComponent) => {

    @connect(({ loading }) => ({
        loading,
    }))
    class LoadingHOC extends React.Component {
        static navigationOptions = WrappedComponent.navigationOptions|| {} ;

        constructor(){
            super();
            this.state = {
                show:false,
            };
        }

        showLoader=(show)=>{
            this.setState({
                show
            })
        }

        render() {

            const {loading, size = 'large', ...props} = this.props;

            console.log(loading);
            return (
                <View style={{flex:1}}>
                    <WrappedComponent {...props} showLoader={this.showLoader}/>
                    <LoadingIndicator loading={this.state.show} size={size}/>
                </View>
            );
        }
    }
    return LoadingHOC;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        width: 110,
        height: 110,
        backgroundColor: '#f0f0f0dd',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
