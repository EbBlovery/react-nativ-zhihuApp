
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    Alert,
    TouchableOpacity,
    FlatList,
    Dimensions,
    WebView
} from 'react-native';

var width = Dimensions.get('window').width;

const html = `
    <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body style="background: red">
            <div>
                asdadasdasdadasdad
            </div>
            <div>
                asdadasdasdadasdad
            </div>
            <div>
                asdadasdasdadasdad
            </div>
            <div>
                asdadasdasdadasdad
            </div>
            <div>
                asdadasdasdadasdad
            </div>
            <div>
                asdadasdasdadasdad
            </div>
        </body>
    </html>
`

export default class DetailsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: ''
        }
    }
    render() {
        return (
            <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    this.state.data && (
                        <WebView
                            originWhitelist={['*']}
                            source={{uri: this.state.data.share_url}}
                            style={{width:width,height: 500}}
                        ></WebView>
                    ) || (<Text></Text>)
                }
            </View>
        );
    }
    componentDidMount(){
        let id = this.props.navigation.getParam('itemId')
        this.fetchData(id)
    }
    fetchData(id){
        fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
        .then(res=> res.text())
        .then(response=>{
            let data = JSON.parse(response)
            // console.error(data)
            // let html = `
            //     <html>
            //         <head>
            //             <meta charset="utf-8">
            //         </head>
            //         <body style="background: red">
            //             ${eval(data.body)}
            //         </body>
            //     </html>
            // `
            this.setState({data: data})
        }).catch(err=>{
            console.log(err)
        })
    }
}