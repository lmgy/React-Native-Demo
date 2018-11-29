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
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { Button } from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../images/bg_screen1.jpg');

import storage from '../utils/Storage';
import Util from './view/utils';

var isLogin = false

class LoginViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '请输入学号',
      password: '',
      login_failed: false,
      showLoading: false,
      
      value:''
    };

  }

  componentWillMount() {
    global.storage.load({
      key: 'loginState',
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      if(ret.status==false){
        ToastAndroid.showWithGravity('未登录，请登录', 1000, ToastAndroid.CENTER);
      }else{
        this.props.navigation.replace('Tab')     
      }
    }).catch()
  }


  renderClick() {
    let userName = this.state.username;
    let password = this.state.password;
    
    let toastMsg;
    if (userName === null || userName === '') {
      toastMsg = '学号不能为空';
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
      } else {
        AlertIOS.alert(toastMsg);
      }
      return;
    }else if (password === null || password === '') {
      toastMsg = '密码不能为空';
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
      } else {
        AlertIOS.alert(toastMsg);
      }
      return;
    }else{
      this.submitLoginCredentials()
      let stuName;
      let params = {
        "stuNum":userName,
        "idNum":password
      };
      fetch("https://wx.idsbllp.cn/api/verify",{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(params)
      }).then(response => response.json())
        .then(json => {
        if (json.status == 200) {
          stuName = json.data.name
          global.storage.save({
            key: 'loginState',
            data: { 
              status: true,
              stuName: stuName,
              stuNum: userName,
              idNum: password,
              classNum: json.data.classNum,
              college: json.data.college,
              gender: json.data.gender,
            },
            expires: null
          });
          this.submitLoginCredentials()
          toastMsg = '登录成功' + stuName;
          ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);

          this.props.navigation.replace('Tab')

        }else{
          this.submitLoginCredentials()
          toastMsg = '登录失败，请重试'
          ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
        }
        })
        .catch(error => {
          this.submitLoginCredentials()
       });
    }
  }

  submitLoginCredentials() {
    const { showLoading } = this.state;
    this.setState({
      showLoading: !showLoading
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#38A9F6"
      translucent={false}
      hidden={true}
      animated={true}/>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
        {
          <KeyboardAvoidingView keyboardVerticalOffset={Util.size.height * -0.35} contentContainerStyle={styles.loginContainer} behavior='padding'>
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.travelText}>CQUPT</Text>
                  <Text style={styles.plusText}>+</Text>
                </View>
                <View style={{marginTop: -10}}>
                  <Text style={styles.travelText}>LEISURE</Text>
                </View>
              </View>


              <View style={styles.loginInput}>
                <TextInput
                placeholder={this.state.username}
                placeholderTextColor="white"
                underlineColorAndroid="white"
                clearButtonMode="always"
                style={styles.inputStyle}
                onChangeText={username => this.setState({ username })}
                />
                <TextInput
                placeholder="请输入身份证后六位"
                placeholderTextColor="white"
                underlineColorAndroid="white"
                clearButtonMode="always"
                secureTextEntry={true}
                password={true}
                style={styles.inputStyle}
                onChangeText={password => this.setState({ password })}
                />
                <Button
                title='登录'
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


export default class LoginView extends Component{

  constructor(props) {
    super(props);
    if(isLogin == true){
      this.props.navigation.replace('Tab')
    }
    global.storage.load({
      key: 'loginState',
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      if(ret.status==true){
        isLogin = true
        this.props.navigation.replace('Tab')
      }
    }).catch()
  }

	render() {
		return(
      <LoginViewScreen navigation={this.props.navigation}/>
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
  loginTitle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'column',
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    marginTop: 15,
    flexDirection: 'column',
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.6,
    height: 40,
    borderRadius: 8,
    alignSelf: 'center',
    color: 'white',
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
  }
});