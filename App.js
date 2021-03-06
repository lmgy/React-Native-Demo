import React, {Component} from 'react';
import {
    Image,
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';

// import Weather from './src/Weather';
import Todo from './src/view/Todo';
import Home from './src/Home';
import Type from './src/Type';
import ShopCar from './src/ShopCar';
// import Mine from './src/Mine';
import Details from './src/Details';
import LoginView from './src/LoginView';
import Mine from './src/StuInfo';
import Classes from './src/Classes/Classes';
import Index from './src/Index';
import jwNews from './src/view/jwNews';
import getElect from './src/view/getElect';
import StuGrade from './src/view/StuGrade';
import Bind from './src/view/Bind';
import NewsDetail from './src/view/NewsDetail';

import applyClassroom from './src/view/applyClassroom';
import busCardMoney from './src/view/busCardMoney';

// import ReminderContainer from './src/view/day20';


const Tab = createBottomTabNavigator({
    //每一个页面的配置
    Classes: {
        screen: Classes,
        navigationOptions: {
            //stackNavigator的属性
            title:'课表',
            headerTitle: '课表',
            tabBarLabel: '课表',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#38A9F6'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_classes.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),

        },
    },
    // Todo: {
    //     screen: Todo,
    //     navigationOptions: {
    //         //stackNavigator的属性
    //         title:'首页',
    //         headerTitle: '首页',
    //         tabBarLabel: '首页',
    //         gestureResponseDistance: {horizontal: 300},
    //         headerBackTitle: null,
    //         headerStyle: {backgroundColor: '#38A9F6'},//导航栏的样式
    //         headerTitleStyle: {//导航栏文字的样式
    //             color: 'white',
    //             //设置标题的大小
    //             fontSize: 16,
    //             //居中显示
    //             alignSelf: 'center',
    //         },
    //         //tab 的属性
    //         tabBarIcon: ({tintColor}) => (
    //             <Image
    //                 source={require('./images/ic_home.png')}
    //                 style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
    //         ),

    //     },
    // },
    // Type: {
    //     screen: Type,
    //     navigationOptions: {
    //         //stackNavigator的属性
    //         headerTitle: '分类',
    //         gestureResponseDistance: {horizontal: 300},
    //         headerBackTitle: null,
    //         headerStyle: {backgroundColor: '#38A9F6'},//导航栏的样式
    //         headerTitleStyle: {//导航栏文字的样式
    //             color: 'white',
    //             //设置标题的大小
    //             fontSize: 16,
    //             //居中显示
    //             alignSelf: 'center',
    //         },
    //         //tab 的属性
    //         tabBarLabel: '分类',
    //         tabBarIcon: ({tintColor}) => (
    //             <Image
    //                 source={require('./images/ic_type.png')}
    //                 style={[{height: 24, width: 24}, {tintColor: tintColor}]}
    //             />
    //         ),
    //     }
    // },
    Index: {
        screen: Index,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '发现',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#38A9F6'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '发现',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_type.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        }
    },
    // ShopCar: {
    //     screen: ShopCar,
    //     navigationOptions: {
    //         //stackNavigator的属性
    //         headerTitle: '购物车',
    //         gestureResponseDistance: {horizontal: 300},
    //         headerBackTitle: null,
    //         headerStyle: {backgroundColor: '#38A9F6'},//导航栏的样式
    //         headerTitleStyle: {//导航栏文字的样式
    //             color: 'white',
    //             //设置标题的大小
    //             fontSize: 16,
    //             //居中显示
    //             alignSelf: 'center',
    //         },
    //         //tab 的属性
    //         tabBarLabel: '购物车',
    //         tabBarIcon: ({tintColor}) => (
    //             <Image
    //                 source={require('./images/ic_shop_car.png')}
    //                 style={[{height: 24, width: 24}, {tintColor: tintColor}]}
    //             />
    //         ),
    //     }
    // },
    Mine: {
        screen: Mine,
        navigationOptions: {
            //stackNavigator的属性
            // headerTitle: '我的',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#38A9F6'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_me.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        }
    },
}, {
    initialRouteName: 'Classes',
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: true,
    //是否允许在标签之间进行滑动
    swipeEnabled: true,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    //设置Tab标签的属性

    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#38A9F6',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 55,
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 13,
            marginTop: -5,
            marginBottom: 5,
        },
        iconStyle: {//图标的样式
            marginBottom: 5,
        }
    },
});


Tab.navigationOptions = ({ navigation }) => {
    let title;
    let header;
    let focusedRouteName = navigation.state.routes[navigation.state.index].routeName;
    switch(focusedRouteName){
        case 'Index':
            title = '发现';
            break;
        case 'Classes':
            title = '课表';
            break;
        // case 'ShopCar':
        //     title = '购物车';
        //     break;
        case 'Mine':
            header = null;
            return {
                header,
              };
            break;
        default:
            title = 'Kbong';
            break;
    }

  
    return {
      title,
    };
  };





/*
 * 初始化StackNavigator
 */
export default Navi = createStackNavigator(
    {
        Tab: { screen: Tab },
        Details: { screen: Details },
        Todo: { screen: Todo },
        jwNews: { screen: jwNews },
        getElect: { screen: getElect },
        Bind: { screen: Bind },
        NewsDetail: { screen: NewsDetail },
        StuGrade: { screen: StuGrade },

        busCardMoney: { screen: busCardMoney },
        applyClassroom: { screen: applyClassroom },

        LoginView: { 
            screen: LoginView,
            navigationOptions: () => ({
                header: null
              }),
        },
    },
    {
        initialRouteName: 'LoginView',
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#38A9F6',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        },
      }
);