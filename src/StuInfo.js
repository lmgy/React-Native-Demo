import React,{ Component } from 'react';
import { 
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  PanResponder,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  ToastAndroid,
  View 
} from 'react-native';
import Util from '../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { SegmentedControl, Button, List } from 'antd-mobile-rn';

import storage from '../utils/Storage';

const BG_IMAGE = require('../images/bg_screen1.jpg');

const bg3 = require('../images/bg_screen3.jpg');
const bg4 = require('../images/bg_screen4.jpg');

const Item = List.Item;

class User extends Component{
	constructor() {
    super();
		this.state = {
			scrollEnabled: false,
      scale: 1,
      iconTop: 95,
      bannerTop:0,
      opacity:0,
      stuName: '',
      stuNum: '',
      classNum: '',
      college: '',
      gender: '',
    };
    global.storage.load({
      key: 'loginState',
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      if(ret.status==false){
        ToastAndroid.showWithGravity('未登录，请登录', 1000, ToastAndroid.CENTER);
      }else{
        this.setState({
          stuName: ret.stuName,
          stuNum: ret.stuNum,
          classNum: ret.classNum,
          college: ret.college,
          gender: ret.gender,
      })}
    }).catch()
    

	}

  _scrollEnabled = false;
	_previousTop = 0;
  _iconTop = 95;
  _scale = 1;
  _bannerTop = 0;
  _opacity = 0;
	_minTop = -192;
	_userStyle = {};
  user = (null : ?{ setNativeProps(props: Object): void });

  _updatePosition() {
	   this.user && this.user.setNativeProps(this._userStyles);
  }
  
  exitLogin(){
    global.storage.remove({
      key: 'loginState'
    });
    global.storage.remove({
      key: 'stuRoom'
    });
    global.storage.remove({
      key: 'classData'
    });
    this.props.navigation.replace(
      'LoginView'
    )
  }

	_endMove(evt, gestureState) {
		this._previousTop = this._userStyles.style.top;
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
	    onStartShouldSetPanResponder: (evt, gestureState) => true,
	    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	    onMoveShouldSetPanResponder: (evt, gestureState) => {
	    	return gestureState.dy/gestureState.dx!=0;
		  },
	    onPanResponderGrant: (evt, gestureState) => {
	       
	    },
	    onPanResponderMove: (evt, gestureState) => {
       	this._userStyles.style.top = this._previousTop + gestureState.dy;
        this._scale = 1+this._userStyles.style.top/162.5;
        this._iconTop = 95 - this._userStyles.style.top/4.16;
        this._bannerTop = 0;
        this._opacity = 0;
        // this._scrollEnabled = false;
        if (this._userStyles.style.top< -62.5) {
          this._scale = 0.6;
          this._iconTop = 110;
          this._bannerTop = -this._userStyles.style.top-62.5;
          this._opacity = Math.pow((-this._userStyles.style.top-62.5)/129.5,0.5)
        };
       	if (this._userStyles.style.top>0) {
       		this._userStyles.style.top = 0;
          this._scale = 1;
          this._iconTop = 95
       	};
       	if (this._userStyles.style.top < this._minTop) {
       		this._userStyles.style.top = this._minTop;
          this._opacity = 1;
          this._bannerTop = 129.5;
          // this._scrollEnabled = true;
       	};

        this.setState({
          // scrollEnabled: this._scrollEnabled,
          scale: this._scale,
          iconTop: this._iconTop,
          bannerTop: this._bannerTop,
          opacity: this._opacity
        });

		   	this._updatePosition();
	    },
	    onPanResponderTerminationRequest: (evt, gestureState) => true,
	    onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
	    onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
	    onShouldBlockNativeResponder: (event, gestureState) => true,
	 	});

    this._userStyles = {
      style: {
        top: this._previousTop,
      },
    };

  }

  componentDidMount() {
		this._updatePosition();
  }
  
  onChange = (e) => {
  }

  onValueChange = (value) => {
  }

	render () {
		let panProps = this.state.scrollEnabled?{}:{...this._panResponder.panHandlers};
		return(
      <View>
      <StatusBar backgroundColor="#38A9F6"
      translucent={false}
      hidden={false}
      animated={true}/>
			<View ref={(user) => {this.user = user;}} style={styles.userContainer} {...panProps}>
				<View style={styles.userPanel}>
          <Image style={[styles.banner,{top: this.state.bannerTop}]} source={BG_IMAGE}></Image>
          <View style={[styles.iconContainer,{top:this.state.iconTop,transform:[{scale:this.state.scale}]}]}><Image style={styles.icon} source={require('../images/Mine/icon.png')}></Image></View>
          <View style={styles.userControl}>
            <TouchableHighlight style={styles.controlIcon}>
              <Icon name="ios-settings" color="#8999a5" size={20}></Icon>
            </TouchableHighlight>
            <TouchableHighlight style={styles.controlBtn}>
              <Icon name="ios-people" color="#8999a5" size={20}></Icon>
            </TouchableHighlight>
            <TouchableOpacity 
              style={styles.controlBtn2}
              onPress={() => {
                ToastAndroid.showWithGravity('添加note', 1000, ToastAndroid.CENTER)
              }}
            >
              <Text style={styles.controlBtnText}>修改信息</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoName}>{this.state.stuName}</Text>
            <Text style={styles.userInfoAccount}>{this.state.stuNum}  {this.state.gender}</Text>
            <View style={styles.userInfoFollow}>
              <Text style={styles.userInfoFollowing}>
                学院:
                <Text style={styles.fontEm}>{this.state.college}</Text>
              </Text>
              <Text style={styles.userInfoFollower}>
                班级号:
                <Text style={styles.fontEm}>{this.state.classNum}</Text>
              </Text>
            </View>
          </View>
          {this.state.bannerTop<=0?<View></View>:<Image style={[styles.banner,{top: this.state.bannerTop}]} source={BG_IMAGE}></Image>}
          {this.state.bannerTop<=0?<View></View>:<Image style={[styles.banner,{top: this.state.bannerTop, opacity:this.state.opacity}]} source={bg3}></Image>}
          <Text style={{position:"absolute",left:Util.size.width/2-30, fontSize:20, fontWeight:"500", top: this.state.bannerTop+90,opacity:this.state.opacity, backgroundColor:"transparent", color:"#fff"}}>我的</Text>
          <View style={styles.segment}>
            <SegmentedControl
            values={['网址导航', '快递位置', '楼栋信息']}
            tintColor={'#2aa2ef'}
            />
          </View>
        </View>
        
				<ScrollView contentInset={{top:0}} style={styles.detailScroll} scrollEnabled={this.state.scrollEnabled}>
					<View style={{width:Util.size.width}}>
            <List>
              <Item
                arrow="horizontal"
              >
                教务在线：http://jwzx.cqupt.edu.cn
              </Item>
              <Item
                arrow="horizontal"
              >
                内网外入：https://cqu.pt
              </Item>
            </List>
          </View>
				</ScrollView>

      </View>
      <View style={styles.exitbtn}>
        <Button 
          type="primary"
          onClick={() => this.exitLogin()}
        >
          退出当前账号
        </Button>
      </View>
      </View>
		)
	}
}


export default class StuInfo extends Component{
	render() {
		return(
      <User navigation={this.props.navigation}/>
		)
	}
}


const styles = StyleSheet.create({
	userContainer:{
		width: Util.size.width,
  	height: Util.size.height * 1.5,
  	backgroundColor:"#fff",
  	position:"absolute",
  	top:0,
  	left:0,
	},
	detailScroll:{
		position:"absolute",
		top: 300,
		backgroundColor:"#f5f8fa",
		width: Util.size.width,
  	height: Util.size.height,
  	left:0,
    borderTopWidth:Util.pixel,
    borderTopColor:"#9eacb6"
	},
	userPanel:{
		flex:1,
		height:300,
	},
	banner:{
		width: Util.size.width,
		height:125,
		position:"absolute",
		top:0,
		left:0
	},
  iconContainer:{
    position:"absolute",
    left:10,
    top:95,
    borderWidth:5,
    borderColor:"#fff",
    borderRadius:5,
  },
  icon:{
    width:68,
    height:68
  },
  userControl:{
    height:55,
    position:"absolute",
    top:125,
    width: 200,
    right:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  controlBtn:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:40,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlBtn2:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:120,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlIcon:{
    width: 30
  },
  controlBtnText:{
    color:"#8999a5",
    fontSize:14
  },
  userInfo:{
    width: Util.size.width,
    position:"absolute",
    top: 165,
    paddingTop:15, paddingLeft:15, paddingBottom:15,
    left:0,
    height:90,
  },
  userInfoName:{
    color:"#292f33",
    fontSize:20,
    fontWeight:"500",
    paddingBottom:5
  },
  userInfoAccount:{
    color:"#66757f",
    paddingBottom:5
  },
  userInfoFollower:{
    color:"#95a4ae",
    width:220
  },
  userInfoFollowing:{
    color:"#95a4ae",
    width:220
  },
  userInfoFollow:{
    flexDirection:"row"
  },
  fontEm:{
    color:"#292f33",
    fontWeight:"500"
  },
  segment:{
    position: "absolute",
    top: 263,
    left:0,
    width: Util.size.width-15,
    paddingLeft:15,
    height:40,
  },
  exitbtn: {
    margin: 16,
    marginTop: (Util.size.height - 48) * 0.85, 
    backgroundColor:"#f5f8fa",
  }
});