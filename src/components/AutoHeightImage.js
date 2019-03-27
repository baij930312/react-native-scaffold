import React from "react";
import { Image } from 'react-native';

export default class AutoHeightImage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            width: 0,
            // Image won't be load while height is 0.
            height: props.style && props.style.height || 1,
        };
    }

    render() {
        const {style, ...props} = this.props;
        const {height} = this.state;
        return (
            <Image
                style={[style, {height}]}
                onLayout={e => this.setState({width: e.nativeEvent.layout.width})}
                onLoad={(e) => {
                    const {width, height} = e.nativeEvent.source;
                    this.setState({
                        height: height * this.state.width / width,
                    });
                }}
                {...props}/>
        );
    }
}