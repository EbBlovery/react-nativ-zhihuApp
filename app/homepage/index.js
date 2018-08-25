import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
var width = Dimensions.get('window').width;

export default  class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            stories: '',
            top_stories: '',
            datas: new Date().getFullYear() + '0' + (new Date().getMonth()+ 1) + '' +  (new Date().getDate() -1 )
        }
    }
    render() {
        return (
            <View style = {{width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={this.state.stories&&this.state.stories}
                    ListHeaderComponent={this.renderHeader.bind(this)}
                    renderItem={this.renderList}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item) => item.key}
                    onEndReached={(info) => {
                        this.getMoreData()
                    } }
                />
            </View>
        );
    }
    renderHeader(){
        let data = this.state.top_stories? this.state.top_stories: ''
        if(!data) return <Text></Text>;
        return (
            <View>
                <Swiper
                    showsButtons={false}
                    height={width * 40 / 75}
                    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                    autoplay={true}
                    horizontal ={true}
                >
                    {
                        data&&data.map((item,index)=>{
                            return (
                                <View>
                                    <Image
                                        source={{uri: item.image}}
                                        style={{width: width,height: width * 40 / 75}}
                                    />
                                    <Text>{item.title}</Text>
                                </View>
                            )
                        })
                    }
                </Swiper>
            </View>
        )
    }
    getMoreData(){
        let data = this.state.datas
        fetch(`http://news-at.zhihu.com/api/4/news/before/${data}`)
        .then(res=> res.text())
        .then(response=>{
            let d =  JSON.parse(response)
            this.setState({stories: this.state.stories.concat(d.stories),datas: Number(this.state.datas) - 1})
            
        })
    }
    renderList = ({item}) => {
        return (
            <View
                key={item.id}
            >
            <TouchableOpacity
                onPress={()=> {
                    this.props.navigation.navigate('DetailsPage',{
                        itemId: item.id
                    });
                }}
                style={{width: width-20, flexDirection:'row',justifyContent: "space-between",backgroundColor: '#fff', alignItems: 'center',marginTop: 10, marginRight: 10,marginLeft: 10,height: 100,borderWidth: 1,borderColor: '#f4f4f4',borderRadius: 5,paddingTop: 10,paddingBottom: 10,paddingLeft: 10,paddingRight: 10}}
            >
                <Text style={{fontSize: 18,width: 300}}>{item.title}</Text>
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
    componentDidMount(){
        fetch('http://news-at.zhihu.com/api/4/news/latest')
        .then(res=> res.text())
        .then(responseText=>{
            let data = JSON.parse(responseText)
            this.setState({stories:data.stories,top_stories: data.top_stories})
        })
    }
}