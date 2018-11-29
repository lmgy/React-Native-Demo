import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    Platform,
    ListView,
    TextInput,
    Modal,
    Image,
    View,
    PixelRatio,
    ToastAndroid,
    StatusBar
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Util from './util'
import Grids from './grid.js';
const { width, height } = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [width - 28, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

export default class Classes extends Component {
    constructor(props) {
        super(props);
        this.icons = { //Step 2 
            'up': 'ios-arrow-up',
            'down': 'ios-arrow-down'
        };
        this.state = {

            obj: [],
            Mon: [],
            Tus: [],
            Wes: [],
            Thu: [],
            Fri: [],
            Sat: [],
            Sun: [],
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            // MyID:this.props.navigation.state.params.MyID,
        };
    }
    render() {
        
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff', padding: 20 }
            : null;
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor="#38A9F6"
            translucent={false}
            hidden={false}
            animated={true}/>
                <Grids obj={this.state.obj}
                    Mon={this.state.Mon}
                    Tus={this.state.Tus}
                    Wes={this.state.Wes}
                    Thu={this.state.Thu}
                    Fri={this.state.Fri}
                    Sat={this.state.Sat}
                    Sun={this.state.Sun}
                     
                    {...this.props} />
                    {/*MyID={this.state.MyID}*/}
                    <ActionButton
                    buttonColor="#38A9F6"
                    offsetX={Util.size.width * 0.11}
                    offsetY={Util.size.height * 0.09}
                    >
                        <ActionButton.Item buttonColor='#9b59b6' title="新建安排" onPress={() => {}}>
                            <Icon name="md-create" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#ff856c' title="关闭提醒" onPress={() => {}}>
                            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1abc9c' title="查看所有安排" onPress={() => {}}>
                            <Icon name="md-done-all" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>


                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this._setModalVisible(false) }}
                    onShow={this.startShow}
                >

                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={styles.header}>
                            <Image style={styles.headerImg} source={require('./logo.png')} />
                            <Text style={styles.headerText}>
                                课表
                            </Text>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    _setModalVisibleJump = (component) => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate(component, {
            onCallBack: (Mon, Tus, Wes, Thu, Fri, Sat, Sun) => {

                this.setState({
                    Mon: Mon,
                    Tus: Tus,
                    Wes: Wes,
                    Thu: Thu,
                    Fri: Fri,
                    Sat: Sat,
                    Sun: Sun,

                })
            }
        });
    }

    startShow = () => {
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    noteBtn: {
        // backgroundColor:'red',
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    noteImg: {
        width: 50,
        height: 50,
    },
    innerContainer: {
        alignItems: 'center',
    },
    shareBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 60,
    },
    shareImg: {
        width: 40,
        height: 40,
    },
    shareText: {
        fontSize: 16,
    },
    row: {
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderColor: '#797979',
        flexDirection: 'row',
        width: width - 60,
    },
    rows: {
        paddingTop: 10,
        flexDirection: 'row',
        width: width - 60,
    },
    rowTitle: {
        fontSize: 16,
        color: 'black',
    },
    rowContent: {
        fontSize: 16,
        position: 'absolute',
        right: 0,
        top: 10,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});






