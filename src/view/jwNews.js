import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'

import { ListItem } from 'react-native-elements';

const newsColor = [
    {
      linearGradientColors: ['#FF9800', '#F44336'],
    },
    {
      linearGradientColors: ['#3F51B5', '#2196F3'],
    },
    {
      linearGradientColors: ['#FFD600', '#FF9800'],
    },
    {
      linearGradientColors: ['#4CAF50', '#8BC34A'],
    },
    {
      linearGradientColors: ['#F44336', '#E91E63'],
    },
];


export default class App extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            details:[],
            isRefreshing: false
        };
    }

    componentWillMount() {
        this._fetchData()
    }

    _fetchData() {
        let url = 'https://we.cqu.pt/api/news/jw_list.php?page=1'
        fetch(url,{
            method:'GET',
            headers:{
              'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => response.json())
        .then(json => {
        if (json.status == 200) {
          this.setState({
            details: json.data
          });    
        }else{
          toastMsg = '查询失败，请重试'
          ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
        }
        })
        .catch(err => {
        });
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
        headerRight: (<View/>),

        //设置导航栏左边的视图
        // headerLeft: (<View/>),

    });

    _onRefresh() {
        this.setState({
          isRefreshing: true,
        });
        this._fetchData();
        this.setState({
            isRefreshing: false,
        });
    }

    onClick(i){
        this.props.navigation.push(
            'NewsDetail',
            {
              'title': '详情',
              'url': 'http://jwzx.cqu.pt/fileShowContent.php?id=' + this.state.details[i].articleid
            }
        )
    }

    render() {
        return (
            <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                refreshing={this.state.isRefreshing}  
                onRefresh={()=>this._onRefresh()}
                tintColor='white'
                title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                />
            }
            >
                <View>{
                    this.state.details.map((l, i) => (
                        <ListItem
                            key={i}
                            component={TouchableScale}
                            friction={90} //
                            tension={100} // These props are passed to the parent component (here TouchableScale)
                            activeScale={0.95} //
                    
                            linearGradientProps={{
                                colors: newsColor[i%4].linearGradientColors,
                                start: {x:1, y:0},
                                end: {x:0.2, y:0},
                            }}
                            ViewComponent={LinearGradient}
                            title={l.title}
                            onPress={() => this.onClick(i)}
                            titleStyle={{ color: 'white', fontWeight: 'bold' }}
                            titleProps={{
                                numberOfLines: 1,
                            }}
                            subtitleStyle={{ color: 'white' }}
                            subtitle={l.time}
                            chevronColor="white"
                            chevron
                            containerStyle={{
                                marginHorizontal: 16,
                                marginVertical: 8,
                                borderRadius: 8,
                            }}
                        />
                    ))
                }
                </View>
            </ScrollView>
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
    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
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