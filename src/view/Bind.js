import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  AsyncStorage,
  AlertIOS,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, Picker } from 'antd-mobile-rn';

// import NavigationExperimental from 'react-native-deprecated-custom-components';

// import createBottomTabNavigator from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('./img/bg_screen4.jpg');

import storage from './Storage';
import Util from './utils'


const building_list = ['1','2','3','4','5','6','8','9',
'10','11','12','15','16','17','18','19',
'20','21','22','23A','23B','24','25','26','27','28','29',
'30','31','32','33','34','35','36','37','39']

const buildings = ['1栋（知行苑1舍）', '2栋（知行苑2舍）', '3栋（知行苑3舍）', '4栋（知行苑4舍）', '5栋（知行苑5舍）', '6栋（知行苑6舍）', '8栋（宁静苑1舍）', '9栋（宁静苑2舍）',
'10栋（宁静苑3舍）', '11栋（宁静苑4舍）', '12栋（宁静苑5舍）', '15栋（知行苑7舍）', '16栋（知行苑8舍）', '17栋（兴业苑1舍）', '18栋（兴业苑2舍）', '19栋（兴业苑3舍）',
'20栋（兴业苑4舍）', '21栋（兴业苑5舍）', '22栋（兴业苑6舍）', '23A栋（兴业苑7舍）', '23B栋（兴业苑8舍）', '24栋（明理苑1舍）', '25栋（明理苑2舍）', '26栋（明理苑3舍）', '27栋（明理苑4舍）', '28栋（明理苑5舍）', '29栋（明理苑6舍）',
'30栋（明理苑7舍）', '31栋（明理苑8舍）', '32栋（宁静苑6舍）', '33栋（宁静苑7舍）', '34栋（宁静苑8舍）', '35栋（宁静苑9舍）', '36栋（四海苑1舍）', '37栋（四海苑2舍）', '39栋（明理苑9舍）']

let district = []
for (var i=0;i<buildings.length;i++){
    district.push({value:building_list[i],label:buildings[i], children:[]})
}


class Bind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingNum: '',
      roomNum: '',
      showLoading: false,
      data: district,
      value: [],
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
    headerRight: (<View/>),

    //设置导航栏左边的视图
    // headerLeft: (<View/>),

});

  renderClick() {
    this.submitLoginCredentials()
    let buildingNum = this.state.buildingNum;
    let roomNum = this.state.roomNum;
    global.storage.save({
      key: 'stuRoom',
      data: { 
        status: true,
        buildingNum: buildingNum,
        roomNum: roomNum,
      },
      expires: null
    });
    this.submitLoginCredentials()
    let toastMsg = '绑定成功，寝室楼：' + buildingNum + ', ' + roomNum + '室。'
    ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
    this.props.navigation.navigate('Index')
  }
  

  submitLoginCredentials() {
    const { showLoading } = this.state;
    this.setState({
      showLoading: !showLoading
    });
  }

  onChange = (value: any) => {
    this.setState({
      value: value,
      buildingNum: value[0],
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
        {
          <KeyboardAvoidingView keyboardVerticalOffset={Util.size.height * -0.305} contentContainerStyle={styles.loginContainer} behavior='padding'>
            <View style={styles.loginView}>
              <View style={styles.titleContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.titleText}>Bedroom</Text>
                </View>
                <View style={{marginTop: 5, marginLeft: 60}}>
                  <Text style={styles.titleText}>Binding</Text>
                </View>
              </View>
              <View>
                <Picker
                  data={this.state.data}
                  cols={1}
                  value={this.state.value}
                  onChange={this.onChange}
                  title={'寝室楼栋'}
                >
                  <List.Item arrow="horizontal" style={styles.roomList}>
                    寝室楼栋
                  </List.Item>
                </Picker>
                <TextInput
                  placeholder="请输入寝室号"
                  clearButtonMode="always"
                  style={styles.inputStyle}
                  onChangeText={roomNum => this.setState({ roomNum })}
                  />
              </View>
              

              <View style={styles.loginInput}>
                <Button
                title='绑定'
                activeOpacity={1}
                underlayColor="transparent"
                onPress={() => this.renderClick()}
                loading={this.state.showLoading}
                loadingProps={{size: 'small', color: 'white'}}
                buttonStyle={styles.loginBtnStyle}
                containerStyle={{marginVertical: 10}}
                titleStyle={{fontWeight: 'bold', color: 'white'}}
                />
              </View>
            </View> 
          </KeyboardAvoidingView>
        }
        </ImageBackground>
      </View>
    );
  }
}


export default class App extends Component{
	render() {
		return(
      <Bind navigation={this.props.navigation}/>
		)
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH * 0.8,
    height: 150,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  roomList:{
    marginTop: 30,
    height: 40, 
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.65,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginTitle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 30,
  },
  travelText: {
    color: 'white',
    fontSize: 30,
  },
  plusText: {
    color: 'white',
    fontSize: 30,
  },
  loginInput: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    marginTop: 30,
    flexDirection: 'column',
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.6,
    height: 40,
    borderRadius: 8,
    alignSelf: 'center',
    fontWeight: '600',
  },
  loginBtnStyle: {
    marginTop: 40,
    height: 50, 
    width: SCREEN_WIDTH * 0.6, 
    backgroundColor: 'transparent', 
    borderWidth: 2, 
    borderColor: 'white', 
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
});