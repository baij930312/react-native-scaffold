import React from "react";
import {
    View,
    Text,
    TextInput,
    Modal,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
// import Separator from "./Separator";
import Colors from "../themes/colors";
import {Metrics} from "../themes";
import {H} from "../common/utils";
import Separator from "./Separator";
import Styles from "../themes/styles";
import PropTypes from "prop-types";


export default class AlertView extends React.Component {

    static propTypes = {
        actions: PropTypes.array,  //[{text:'',style:{},clock:()=>{}},{text:'',style:{},clock:()=>{}}]
        title: PropTypes.string,
        renderTitle: PropTypes.func,
    };

    constructor() {
        super();
        this.state = {
            text: '',
            visible:false,
        };
    }

    render() {
        const {actions,title,height,renderTitle,...props} = this.props;
        let This = this;
        return (
            <Modal
                visible={this.state.visible}
                transparent={true}
                animationType='fade'>
                <TouchableOpacity activeOpacity={1}
                                  onPress={()=>{
                                      this.setState({visible:false})}
                                  }
                                  style={ModalStyles.container}
                                  {...props}
                >
                    <View style={[ModalStyles.content,{height:height||H(147)}]}>

                        <View style={[Styles.flex1,Styles.center]}>
                            {
                                function(){
                                    if (renderTitle){
                                        return renderTitle()
                                    } else {
                                        return <Text style={ModalStyles.title}>{title||''}</Text>
                                    }
                                }()
                            }

                        </View>
                        <Separator color={'#E6E6E6'} length={1}/>
                        <View style={[ModalStyles.bottom,Styles.row]}>
                            {
                                function(){
                                    return actions.map((item,index)=>{
                                        return <TouchableOpacity style={[Styles.center,Styles.flex1,Styles.row]} activeOpacity={1}
                                        onPress={()=>{
                                            if (item.click){
                                                item.click();
                                            }
                                            This.setState({visible:false,})
                                        }}>
                                            { index>0 &&   <Separator color={'#E6E6E6'} length={1} direction={1}/>}
                                            <View style={[Styles.center,Styles.flex1,Styles.row]}>
                                                <Text style={[ModalStyles.text,item.style]}>{item.text}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    })
                                }()
                            }

                        </View>
                    </View>

                </TouchableOpacity>
            </Modal>
        );
    }

    show(){
        this.setState({
            visible:true,
        })
    }
}


const ModalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3333',
        justifyContent: 'center',
    },
    content: {
        alignSelf:'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
        height:H(147),
        width:'80%',
        // paddingVertical:8,
    },
    title:{
        fontWeight:'400',
        color:'rgba(51,51,51,1)',
        fontSize:16,
        lineHeight:24,
        textAlign: 'center',
    },
    bottom:{
        width:'100%',
        height: H(40),
        justifyContent: 'space-around',
    },
    text:{
        fontSize:16,
        fontWeight:'400',
        color:'rgba(102,102,102,1)',
        lineHeight:22,
    }
});