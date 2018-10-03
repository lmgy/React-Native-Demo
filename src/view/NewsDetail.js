import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Button,
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet } from 'antd-mobile-rn';

let _this = null;

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            url: '',
            isRefreshing: false
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({

        headerTitle: navigation.getParam('title',''),
        //设置滑动返回的距离
        gestureResponseDistance: {horizontal: 300},

        //是否开启手势滑动返回，android 默认关闭 ios打开
        gesturesEnabled: true,

        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //导航栏的样式
        headerStyle: styles.headerStyle,
        //导航栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
        //返回按钮的颜色
        headerTintColor: 'white',

        //隐藏顶部导航栏
        // header: null,

        //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (<Icon.Button name="md-share" size={25} color="white" backgroundColor="#38A9F6" onPress={()=>_this.showShareActionSheet()}/>),

        //设置导航栏左边的视图
        // headerLeft: (<View/>),

    });

    componentDidMount(){
        this.setState({
            url: this.props.navigation.state.params.url
        })
        _this = this;
    }

    showShareActionSheet(){
        const opts: any = {
          message: this.state.url,
          title: '分享到',
        };
    
        ActionSheet.showShareActionSheetWithOptions(
          opts,
          (error: any) => alert(error),
          (success: any, method: any) => {
            let text;
            if (success) {
                ToastAndroid.showWithGravity('分享成功', 1000, ToastAndroid.CENTER);
            }
          },
        );
    }


    render() {
        return (
            <WebView
                //自动设置样式
                automaticallyAdjustContentInsets={true}
                style={styles.container}
                source={{uri:this.state.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerStyle: {
        backgroundColor: '#38A9F6',
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },

});