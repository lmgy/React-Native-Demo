import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    RefreshControl,
    WebView,
} from 'react-native';

import { Button } from 'react-native-elements'; 
import { Modal, InputItem, List, Picker, WhiteSpace } from 'antd-mobile-rn';


const Item = List.Item;
const Brief = Item.Brief;

declare var jest: any;

const reason_list = ['1','2','3','4','5','6','8']

const reason = ['班级学生活动', '专业学生活动', '年级学生活动', '学生社团活动', '党团活动', '竞赛、讲座', '单位招聘', '其他']

const week = ['第11周','第12周']
const week_value = ['11','12']

const day = ['星期1','星期2','星期3','星期4','星期5','星期6','星期7']
const day_value = ['1','2','3','4','5','6','7']

const lesson = ['1、2节','3、4节','5、6节','7、8节','9、10节','11、12节']
const lesson_value = ['1','2','3','4','5','6']

let district = []
for (var i=0;i<reason.length;i++){
    district.push({value:reason_list[i],label:reason[i], children:[]})
}

let lesson_data = []
let day_data = []
let week_data = []
for (var i=0;i<lesson.length;i++){
  lesson_data.push({value:lesson_value[i],label:lesson[i], children:[]})
}
for (var i=0;i<day.length;i++){
  day_data.push({value:day_value[i],label:day[i], children:lesson_data})
}
for (var i=0;i<week.length;i++){
  week_data.push({value:week_value[i],label:week[i], children:day_data})
}

let room = ['2117','2216','2217','4101','4102']
let room_data = []
for (var i=0;i<room.length;i++){
  room_data.push({value:room[i],label:room[i], children:[]})
}

export default class App extends Component {

    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         details:[],
    //         isRefreshing: false
    //     };
    // }

  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      applyReason:[],
      activityName: '',
      college:'',
      principal:'',
      nameTel: '',
      data: district,
      weekData: week_data,
      roomValue: [],
      visible: false,
      roomData:room_data,
      selectRoom:[]

    };
  }


  onClose = () => {
    this.setState({
      visible: false,
    });
  }


  render() {
    const footerButtons = [
      { text: '提交申请(无法修改)', onPress: () => console.log('ok') },
    ];
    return (

      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List>
          <Picker
          data={this.state.data}
          cols={1}
          value={this.state.applyReason}
          onChange={(value: any) => {
            console.log(value)
            this.setState({
              applyReason: value,
            });
          }}
        >
          <List.Item arrow="horizontal">
          申请原因
          </List.Item>

          </Picker>
          <InputItem
            clear
            value={this.state.activityName}
            onChange={(value: any) => {
              this.setState({
                activityName: value,
              });
            }}
            placeholder="请输入活动名称"
          >
          活动名称
          </InputItem>

          <InputItem
            clear
            value={this.state.college}
            onChange={(value: any) => {
              this.setState({
                college: value,
              });
            }}
            placeholder="请输入使用学院(单位)"
          >
          使用学院
          </InputItem>

          <InputItem
          clear
          value={this.state.principal}
          onChange={(value: any) => {
            this.setState({
              principal: value,
            });
          }}
          placeholder="请输入使用学院(单位)负责人"
          >
          使用负责人
          </InputItem>

          <InputItem
          clear
          value={this.state.nameTel}
          onChange={(value: any) => {
            this.setState({
              nameTel: value,
            });
          }}
          placeholder="请输入联系人姓名及电话"
          >
          姓名电话
          </InputItem>

          <Picker
          data={this.state.weekData}
          cols={3}
          value={this.state.roomValue}
          onChange={(value: any) => {
            console.log(value)
            this.setState({
              roomValue: value,
            });
          }}
        >
          <List.Item arrow="horizontal">
          申请时间(7天内)
          </List.Item>
          </Picker>

          <List.Item>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <View style={{alignItems: 'center'}}>
          <Button
            activeOpacity={1}
            title="查询可申请教室"
            loadingProps={{size: 'small', color: 'white'}}
            buttonStyle={{backgroundColor: '#38A9F6', borderRadius: 5}}
            titleStyle={{fontWeight: 'bold', fontSize: 23}}
            containerStyle={{marginVertical: 10, height: 50, width: 230}}
            underlayColor="transparent"
            onPress={() => this.setState({ visible: true })}
          />
          </View>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          <WhiteSpace size="xl"/>
          </List.Item>
        </List>

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
          <Text style={{ textAlign: 'left' }}>查询教室成功，请选择要申请的教室{this.state.value}</Text>
          <WhiteSpace size="xl"/>
          <Picker
          data={this.state.roomData}
          cols={1}
          value={this.state.selectRoom}
          onChange={(value: any) => {
            console.log(value)
            this.setState({
              selectRoom: value,
            });
          }}
        >
            <List.Item arrow="horizontal">
            选择教室
            </List.Item>
          </Picker>
          </View>
        </Modal>
      </ScrollView>
    );
  }


    // componentWillMount() {
    //     this._fetchData()
    // }
    

    // _fetchData() {
    //     let url = 'https://we.cqu.pt/api/news/jw_list.php?page=1'
    //     fetch(url,{
    //         method:'GET',
    //         headers:{
    //           'Accept': 'application/x-www-form-urlencoded',
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //     }).then(response => response.json())
    //     .then(json => {
    //     if (json.status == 200) {
    //       this.setState({
    //         details: json.data
    //       });    
    //     }else{
    //       toastMsg = '查询失败，请重试'
    //       ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
    //     }
    //     })
    //     .catch(err => {
    //     });
    // }


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