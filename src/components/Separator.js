import React from 'react';
import  PropTypes  from 'prop-types';
import {
    View,
} from 'react-native';

export default class Separator extends React.Component {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const {height, width, color} = props;
        this.styles = {
            backgroundColor: color || '#0000',
        };
        if (width > 0) {
            this.styles.width = width;
        } else {
            this.styles.height = height || 5;
        }
    }

    render() {
        return (
            <View style={this.styles}/>
        );
    }
}