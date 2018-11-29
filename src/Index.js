import React, { Component } from 'react';
import {
  AppRegistry,
  DeviceEventEmitter,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import Util from './view/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { Carousel } from 'antd-mobile-rn';


class MainView extends Component {
  constructor() {
    super();
    this.state = {
      days:[{
        key:0,
        title:"教务公告",
        isFA: false,
        icon: "ios-list-box",
        size: 48,
        color: "#ff856c",
        component: 'jwNews'
      },{
        key:1,
        title:"电费查询",
        isFA: false,
        icon: "ios-cash",
        size:60,
        color:"#90bdc1",
        component: 'getElect'
      },{
        key:2,
        title:"成绩查询",
        isFA: false,
        icon: "ios-school",
        size:60,
        color:"#2aa2ef",
        component: 'StuGrade'
      },
      {
        key:3,
        title:"TODO",
        isFA: false,
        icon: "ios-folder",
        size:60,
        color:"#FF9A05",
        component: 'Todo'
      },
      {
        key:4,
        title:"申请教室",
        isFA: false,
        icon: "md-home",
        size:60,
        color:"#bfeabc",
        component: 'applyClassroom'
      },
      {
        key:5,
        title:"公交卡余额",
        isFA: false,
        icon: "md-card",
        size:60,
        color:"#a1a0df",
        component: 'busCardMoney'
      }]
    }
  }

  _jumpToDay(index){
    this.props.navigation.push(
      this.state.days[index].component,
      {
        'title':this.state.days[index].title,
      }
    )
  }

  render() {
    var _this = this
    var boxs = this.state.days.map(function(elem, index) {
      return(
        <TouchableHighlight key={elem.key} style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]} underlayColor="#eee" onPress={()=> _this._jumpToDay(index)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>{elem.title}</Text>
            {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <View>
        <Carousel
              style={styles.wrapper}
              selectedIndex={2}
              autoplay
              infinite
            >
              <View style={styles.containerHorizontal}>
                <Image style={styles.image} source={require("./view/img/page1.png")}></Image>
                <Text style={styles.slideText}>React Native</Text>
              </View>
              <View style={styles.containerHorizontal}>
                <Image style={styles.image} source={require("./view/img/page2.png")}></Image>
                <Text style={styles.slideText}>By:lmgy</Text>
              </View>
        </Carousel>
        <View style={styles.touchBoxContainer}>
          {boxs}
        </View>
      </View>
    );
  }
}

export default class Index extends Component{
	render() {
		return(
      <MainView navigation={this.props.navigation}/>
		)
	}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  mainView: {
    marginTop: 55
  },
  navBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navTitle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: "#555",
  },
  itemWrapper:{
    backgroundColor: "#f3f3f3"
  },
  touchBox:{
    width: Util.size.width/3-0.33334,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxIcon:{
    position:"relative",
    top:-10
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    height: 80,
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  wrapper: {
    backgroundColor: '#fff',
  },
});
