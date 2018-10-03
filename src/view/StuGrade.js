import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    RefreshControl,
    ToastAndroid
} from 'react-native';

import { List, WhiteSpace } from 'antd-mobile-rn';

const Item = List.Item;
const Brief = Item.Brief;


class ListItem extends Component{
    render(){
      return(
        <List>
            <Item
                extra={
                    <View>
                        {this.props.detail.grade}{this.props.detail.property}
                    </View>
                }
            >
                {this.props.detail.course}
            </Item>
        </List>
      );
    }
}

    
export default class App extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            details:[],
            isRefreshing: false
        };
    }


    componentWillMount() {

        global.storage.load({
          key: 'loginState',
          autoSync: false,
          syncInBackground: true,
        }).then(ret => {
          if(ret.status==true){

              this._fetchData(ret.stuNum)
            
          }
        }).catch()
      }
    

    

    _fetchData(stuNum) {
        let url = 'https://wx.idsbllp.cn/api/examGrade'
        let params = {
            "stuNum":stuNum
        };
        fetch(url,{
            method:'POST',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
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

    renderExpenseItem(item , i) {
        return <ListItem navigation={this.props.navigation} detail={item} key={i}/>; 
    }

    _onRefresh() {
        this.setState({
          isRefreshing: true,
        });
        this._fetchData();
        this.setState({
            isRefreshing: false,
        });
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
            {
                this.state.details.map((item,i)=>this.renderExpenseItem(item,i))
            }
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