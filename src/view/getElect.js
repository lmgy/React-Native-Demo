import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';

import { PricingCard } from 'react-native-elements';
import storage from '../../utils/Storage';
import Utils from './utils.js';

class ToBind extends Component{
    
    render() {
        return (
            <View style={styles.container}>
                <Text>对不起，你还没有绑定寝室，请前往绑定</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={
                    () => {
                        this.props.navigation.navigate('Bind',{
                            'title':'绑定寝室',
                          })
                    }
                }>
                    <Text style={{color: 'white'}}>绑定寝室</Text>
                </TouchableOpacity>
            </View>
        );
    }

}



class ElectInfo extends Component{

    constructor(props: any) {
        super(props);
        this.state = {
            buildingNum: '',
            roomNum: '',
            elec_spend: '',
            elec_cost: [],
            record_time: '',
            isRefreshing: false
        };
    }


    componentWillMount() {
        global.storage.load({
          key: 'stuRoom',
          autoSync: false,
          syncInBackground: true,
        }).then(ret => {
          if(ret.status==true){
   
                this.setState({
                    buildingNum: ret.buildingNum,
                    roomNum: ret.roomNum
                })
                this._fetchData()
            
          }
        }).catch()
    }
    


    _fetchData() {
        let url = 'https://wx.idsbllp.cn/MagicLoop/index.php?s=/addon/ElectricityQuery/ElectricityQuery/queryElecByRoom'
        fetch(url,{
            method:'POST',
            headers:{
              'Accept': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'building=' + this.state.buildingNum + '&room=' + this.state.roomNum
        }).then(response => response.json())
        .then(json => {
        if (json.status == 200) {
          this.setState({
            elec_spend: json.elec_inf.elec_spend,
            elec_cost: json.elec_inf.elec_cost,
            record_time: json.elec_inf.record_time
          });    
        }else{
          toastMsg = '查询失败，请重试'
          ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
        }
        })
        .catch(err => {
        });
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
            <View style = {styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.isRefreshing}  
                        onRefresh={()=>this._onRefresh()}
                        tintColor='white'
                        title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                        />
                    }
                    style={{marginTop: Utils.size.height/6}}
                >
                    <PricingCard
                    color="#38A9F6"
                    title="电费详情"
                    price={typeof(this.state.elec_cost[0]) == "undefined"?
                        "¥0.00":
                        "¥" + this.state.elec_cost[0] + "." + this.state.elec_cost[1]
                    }
                    info={[
                        "寝室:" + this.state.buildingNum + "-" + this.state.roomNum, 
                        "用电量:" + this.state.elec_spend + " 度", 
                        "统计截止时间:" + this.state.record_time
                    ]}
                    button={{
                        title: '切换寝室', 
                        icon: 'transform', 
                        color: '#38A9F6'
                    }}
                    onButtonPress={() => {
                        this.props.navigation.navigate('Bind',{
                            'title':'绑定寝室',
                        })
                    }}
                    />

                </ScrollView>
            </View>
        );
    }

}


export default class App extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            isBind: false,
        };
    }

    componentWillMount() {
        global.storage.load({
          key: 'stuRoom',
          autoSync: false,
          syncInBackground: true,
        }).then(ret => {
          if(ret.status==true){

              this.setState({
                isBind: ret.status,
              });
            
          }
        }).catch()
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

    
    render() {
        if(this.state.isBind==false){
            return(
                <ToBind navigation={this.props.navigation}/>
            );
        }else{
            return(
                <ElectInfo navigation={this.props.navigation}/>
            );
        }
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
        marginTop: 40,
        width: 240,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#38A9F6',
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