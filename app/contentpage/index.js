
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    Alert,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
// import { relative } from 'path';

var width = Dimensions.get('window').width;
export default class ContentPage extends Component { 
    constructor(props){
        super(props)
        this.state = {
            data: '',
            refreshing: false
        }
    }
    render() {
        return (
            <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{backgroundColor:'#fafafa'}}>
                    <FlatList
                        data={this.state.data&&this.state.data.stories}
                        ListHeaderComponent={this.renderHeader.bind(this)}
                        renderItem={this.renderList.bind(this)}
                        refreshing={this.state.refreshing}
                        keyExtractor={this._keyExtractor}
                        onRefresh={this._onRefresh}
                        style={{backgroundColor:'#fafafa'}}
                        onEndReachedThreshold={0.1}
                        onEndReached={(info) => {
                            Alert.alert("滑动到底部了");
                        } }
                    />
                </View>
            </View>
        );
    }
    _keyExtractor = (item,index) => item.key
    _onRefresh(){

    }
    renderList({item}){
        return (
            <View
                key={item.key}
            >
                <TouchableOpacity
                    style={{flexDirection:'row',justifyContent: "space-between",backgroundColor: '#fff', alignItems: 'center',marginTop: 10, marginRight: 10,marginLeft: 10,height: 100,borderWidth: 1,borderColor: '#f4f4f4',borderRadius: 5,paddingTop: 10,paddingBottom: 10,paddingLeft: 10,paddingRight: 10}}
                    onPress={()=> {
                        this.props.navigation.navigate('DetailsPage',{
                            itemId: item.id
                        });
                    }}
                >
                    <Text style={{fontSize: 15,width: 300}}>{item.title}</Text>
                    {
                        item.images && item.images[0] && (
                            <Image
                                source={{uri: item.images? item.images[0]?item.images[0]: '': ''}}
                                style={{width: 70,height: 70, borderRadius: 5}}
                            />
                        )
                    }
                </TouchableOpacity>
            </View>
        )
    }
    renderHeader(){
        // let data = this.state.data?'':''
        return (
            <View style={{position: 'relative',}}>
                {
                    this.state.data.image && (
                        <Image
                            source={{uri: this.state.data.image}}
                            style={{width: width,height: 200}}
                        />
                    )
                }
                <Text style={{position: "absolute",bottom: 20,marginLeft: 40,fontSize: 20,color: '#fff'}}>{this.state.data.description?this.state.data.description: ''}</Text>
            </View>
        )
    }
    componentDidUpdate(){
        const itemId = this.props.navigation.getParam('itemId')
        this.fetchData(itemId)
    }
    componentDidMount(){
        const itemId = this.props.navigation.getParam('itemId')
        this.fetchData(itemId)
    }
    fetchData(id){
        fetch(`http://news-at.zhihu.com/api/4/theme/${id}`)
        .then(res=> res.text())
        .then(responseText=>{
            let data = JSON.parse(responseText)
            this.setState({data: data})
        })
    }
}
