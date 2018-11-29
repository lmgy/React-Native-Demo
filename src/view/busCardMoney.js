import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    RefreshControl,
    ToastAndroid,
} from 'react-native';

import { Button } from 'react-native-elements';
import { InputItem, List, Modal, Picker, WhiteSpace, WingBlank } from 'antd-mobile-rn';



export default class App extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      visible: false,
      updatetime: '',
      yue:'',
    };
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }


  _fetchData(cardId) {
    if(cardId.length != 16){
      ToastAndroid.showWithGravity('卡号错误，请重新输入！', 1000, ToastAndroid.CENTER);
    }else{
      let url = 'https://tj.md51.cn/api/getjtkyue'
      console.log(cardId)
      let params = {
        "cardno": cardId.toString(),
        "city":"changtongka"
      }
      fetch(url,{
          method:'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params)
      }).then(response => response.json())
      .then(json => {
        console.log(json.updatetime)
        console.log(json.yue)
        this.setState({
          updatetime: json.updatetime,
          yue: json.yue
        })
        this.setState({ visible: true })
      })
      .catch(err => {
      });
    }
  }

  render() {
    const footerButtons = [
      { text: '确定', onPress: () => console.log('ok') },
    ];
    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List renderHeader={() => '使用nfc或输入卡号'}>
          <InputItem
            clear
            type='number'
            maxLength={16}
            value={this.state.value}
            onChange={(value: string) => {
              console.log('value = ' + value)
              this.setState({
                value,
              });
            }}
            placeholder="请输入畅通卡卡号"
          >
          卡号
          </InputItem>

          <List.Item>
            <WhiteSpace size="xl"/>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
              style={{width: 256, height: 256}}
              source={require('../../assets/images/nfc.png')}
              />
              <WhiteSpace size="lg"/>
                <Text>使用nfc时请将畅通卡紧贴手机</Text>
            </View>
            <WhiteSpace size="xl"/>
            <WhiteSpace size="xl"/>
            <View style={{alignItems: 'center'}}>
            <Button
            activeOpacity={1}
            title="查询余额"
            loadingProps={{size: 'small', color: 'white'}}
            buttonStyle={{backgroundColor: '#38A9F6', borderRadius: 5}}
            titleStyle={{fontWeight: 'bold', fontSize: 23}}
            containerStyle={{marginVertical: 10, height: 50, width: 230}}
            underlayColor="transparent"
            // onPress={() => this.setState({ visible: true })}
            onPress={() => this._fetchData(this.state.value)}
            />
            </View>
            <WhiteSpace size="xl"/>
            <WhiteSpace size="xl"/>
            <WhiteSpace size="xl"/>
          </List.Item>
        </List>
        <WhiteSpace size="xl"/>


        <Modal
          title="查询结果"
          transparent
          onClose={this.onClose}
          maskClosable
          visible={this.state.visible}
          closable
          footer={footerButtons}
        >
          <View style={{ paddingVertical: 20 }}>
            <WhiteSpace size="xl"/>
            <Text style={{ textAlign: 'left', fontSize: 24 }}>卡内余额：{this.state.yue} 元</Text>
            <WhiteSpace size="xl"/>
            <WhiteSpace size="xl"/>
            <Text style={{ textAlign: 'left' }}>卡号：{this.state.value}</Text>
            <WhiteSpace/>
            <Text style={{ textAlign: 'left' }}>余额更新时间：{this.state.updatetime}</Text>
          </View>
        </Modal>

      </ScrollView>

    );
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


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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