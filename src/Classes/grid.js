import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    FlatList,
    Text,
    View
} from 'react-native';
import Util from './util.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Modal, Button, Drawer, List, WhiteSpace, WingBlank } from 'antd-mobile-rn';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');

import storage from '../view/Storage';

const colors = ['#eebbdd', '#bbccee', '#bfeabc', '#fa98a5', '#fcc8a0', '#f4c7dc', '#a5edd5', '#a1a0df', '#b9d4ff', '#ecd1fe', '#d4ffe1'];
export default class Grids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isRefreshing: false,
            showItem: '',
            fclassName: '',
            username: '',
            classInfo: '',
            obj: this.props.obj,
            Mon: this.props.Mon,
            Tus: this.props.Tus,
            Wes: this.props.Wes,
            Thu: this.props.Thu,
            Fri: this.props.Fri,
            Sat: this.props.Sat,
            Sun: this.props.Sun,
        };
    }

    componentWillMount() {
    
        global.storage.load({
          key: 'loginState',
          autoSync: false,
          syncInBackground: true,
        }).then(ret => {
          if(ret.status==true){
              this.setState({
                username: ret.stuNum,
              });

                global.storage.load({
                    key: 'classData',
                    autoSync: false,
                    syncInBackground: true,
                }).then(ret => {
                if(ret.status==true && ret.classInfo != ''){
                    this.setState({
                        classInfo: ret.classInfo,
                    });
                    this._dataProcess(ret.classInfo)
                }else{
                    this._fetchData(true);
                }
                }).catch(err => {
                    this._fetchData(true)
                })

          }else{
            alert('未登录')
          }
        }).catch()
    }
    

    onClose = () => {
        this.setState({
          visible: false,
        });
    }

    _onRefresh() {
        this.setState({
          isRefreshing: true,
        });
        this._fetchData(true);
        this.setState({
            isRefreshing: false,
        });
    }

    _keyExtractor =  (item, index) => index.toString();
    _renderItem = ({ item, index }) => {
        var num = Math.floor(Math.random() * 10);
        var strss = item.fClasstime.split("~")
        var heights = 2 * 65;
        var Dates = [];
        switch (item.fweek) {
            case "星期一":
                Dates = this.state.Mon;
                break;
            case "星期二":
                Dates = this.state.Tus;
                break;
            case "星期三":
                Dates = this.state.Wes;
                break;
            case "星期四":
                Dates = this.state.Thu;
                break;
            case "星期五":
                Dates = this.state.Fri;
                break;
            case "星期六":
                Dates = this.state.Sat;
                break;
            case "星期日":
                Dates = this.state.Sun;
                break;
        }
        if (index == 0) {
            var marginTop = (strss[0] - 1) * 65;
        } else {
            let BefIndex = index - 1;
            let Befstr = Dates[BefIndex].fClasstime.split("~");
            var marginTop = (strss[0] - Befstr[1] - 1) * 65;

        }

        return (
            <View style={[styles.center,
                { borderRadius: 10, backgroundColor: colors[num], width: width * 2 / 15, height: heights, marginTop: marginTop, }
                ]}>
                    <TouchableOpacity
                        onPress={() => this.setState({ 
                            visible: true,
                            showItem: item,
                        })}
                    >
                        <Text style={styles.color}>{item.fclassName}@{item.fPlace}</Text>
                    </TouchableOpacity>
            </View>
        );

    }
    render() {

        return (
            <View>

                <Modal
                title="Title"
                popup={true}
                onClose={this.onClose}
                animationType="slide-up"
                maskClosable={true}
                visible={this.state.visible}
                >
                <View style={{ paddingVertical: 20 }}>
                <Text style={styles.title}>课程信息        {this.state.showItem.ftype}</Text>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>课程名称：</Text>
                    <Text style={styles.textMessage} numberOfLines={1}>{this.state.showItem.fclassName}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>上课地点：</Text>
                    <Text style={styles.textMessage}>{this.state.showItem.fRoom}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>上课教师：</Text>
                    <Text style={styles.textMessage}>{this.state.showItem.fTeachar}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>周期：</Text>
                    <Text style={styles.textMessage}>{this.state.showItem.fzhouqi}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>星期：</Text>
                    <Text style={styles.textMessage}>{this.state.showItem.fweek}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>课时：</Text>
                    <Text style={styles.textMessage}>{this.state.showItem.fClasstime}节</Text>
                </View>
                </View>
                <WingBlank>
                <Button type="primary" inline onClick={this.onClose}>
                返 回
                </Button>
                </WingBlank>
                <WhiteSpace size="lg"/>
                </Modal>

                <View style={{ height: 30 }}>
                    <Grid>
                        <Row>
                            <Col style={styles.center} size={1}><Text>\</Text></Col>
                            <Col style={styles.center} size={2}><Text>周一</Text></Col>
                            <Col style={styles.center} size={2}><Text>周二</Text></Col>
                            <Col style={styles.center} size={2}><Text>周三</Text></Col>
                            <Col style={styles.center} size={2}><Text>周四</Text></Col>
                            <Col style={styles.center} size={2}><Text>周五</Text></Col>
                            <Col style={styles.center} size={2}><Text>周六</Text></Col>
                            <Col style={styles.center} size={2}><Text>周日</Text></Col>
                        </Row>
                    </Grid>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.isRefreshing}  
                        onRefresh={()=>this._onRefresh()}
                        tintColor='white'
                        title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                        />
                    }
                >
                    <View style={{ height: 780, marginBottom: 85, }}>
                        <Grid>
                            <Col size={1}>
                                <Row style={styles.center} size={1}><Text>1</Text></Row>
                                <Row style={styles.center} size={1}><Text>2</Text></Row>
                                <Row style={styles.center} size={1}><Text>3</Text></Row>
                                <Row style={styles.center} size={1} ><Text>4</Text></Row>
                                <Row style={styles.center} size={1} ><Text>5</Text></Row>
                                <Row style={styles.center} size={1} ><Text>6</Text></Row>
                                <Row style={styles.center} size={1} ><Text>7</Text></Row>
                                <Row style={styles.center} size={1} ><Text>8</Text></Row>
                                <Row style={styles.center} size={1} ><Text>9</Text></Row>
                                <Row style={styles.center} size={1} ><Text>10</Text></Row>
                                <Row style={styles.center} size={1} ><Text>11</Text></Row>
                                <Row style={styles.center} size={1} ><Text>12</Text></Row>
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Mon == '' ? <FlatList
                                        data={this.state.Mon}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Mon}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Tus == '' ? <FlatList
                                        data={this.state.Tus}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Tus}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Wes == '' ? <FlatList
                                        data={this.state.Wes}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Wes}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Thu == '' ? <FlatList
                                        data={this.state.Thu}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Thu}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Fri == '' ? <FlatList
                                        data={this.state.Fri}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Fri}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }

                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Sat == '' ? <FlatList
                                        data={this.state.Sat}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Sat}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Sun == ''? <FlatList
                                        data={this.state.Sun}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Sun}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }

                            </Col>
                        </Grid>
                    </View>
                </ScrollView>
            </View>

        );
    }


    _dataProcess(data) {
        let obj = data.data;

        let _Mon = [];
        let _Tus = [];
        let _Wes = [];
        let _Thu = [];
        let _Fri = [];
        let _Sat = [];
        let _Sun = [];

        let Mon = [];
        let Tus = [];
        let Wes = [];
        let Thu = [];
        let Fri = [];
        let Sat = [];
        let Sun = [];


        for (var x = 0; x < obj.length; x++) {
            if (obj[x].day == '星期一') {
                _Mon.push(obj[x]);
            } else if (obj[x].day == '星期二') {
                _Tus.push(obj[x]);
            } else if (obj[x].day == '星期三') {
                _Wes.push(obj[x]);
            } else if (obj[x].day == '星期四') {
                _Thu.push(obj[x]);
            } else if (obj[x].day == '星期五') {
                _Fri.push(obj[x]);
            } else if (obj[x].day == '星期六') {
                _Sat.push(obj[x]);
            } else if (obj[x].day == '星期日') {
                _Sun.push(obj[x]);
            }
        }

        let Week = [Mon, Tus, Wes, Thu, Fri, Sat, Sun]
        let _Week = [_Mon, _Tus, _Wes, _Thu, _Fri, _Sat, _Sun]

        for (var x = 0; x< Week.length; x++){
            if(_Week[x].length > 1){
                for (var y = 0; y < _Week[x].length; y++) {
                    Week[x].push({
                        "fweek": _Week[x][y].day,
                        "fclassName": _Week[x][y].course,
                        "fPlace": _Week[x][y].classroom.length < 10 ? _Week[x][y].classroom : "",
                        "fRoom": _Week[x][y].classroom,
                        "fzhouqi": _Week[x][y].rawWeek,
                        "fTeachar": _Week[x][y].teacher,
                        "ftype": _Week[x][y].type,
                        "fClasstime": _Week[x][y].begin_lesson + "~" + (_Week[x][y].begin_lesson + 1)
                    })
                }
            }
        }

        this.setState({
            obj: obj,
            Mon: Mon,
            Tus: Tus,
            Wes: Wes,
            Thu: Thu,
            Fri: Fri,
            Sat: Sat,
            Sun: Sun,
        });
    }


    _fetchData(isforce) {
        var _this = this
        let classInfo = _this.state.classInfo
        if(classInfo != '' && isforce == false){
            _this._dataProcess(classInfo)
        }else{
        Util.post('https://wx.idsbllp.cn/api/kebiao', 'stuNum=' + _this.state.username, function(data){
            if (data.status == 200){
                _this._dataProcess(data)
                global.storage.save({
                    key: 'classData',
                    data: { 
                      status: true,
                      classInfo: data,
                    },
                    expires: null
                });
            }
        },
        function(err){
            alert('发生错误' + err)
        })
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    color: {
        color: '#fff',
        fontSize: 12,
    },
    title: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    textWrap: {
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 40,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
    },
    textName: {
        fontSize: 18,
        color: 'black',
    },
    textMessage: {
        fontSize: 16,
        position: 'absolute',
        right: 15,
        width: width * 0.5,
        textAlign: 'right',
    },
});