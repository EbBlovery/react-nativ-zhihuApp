import React,{Component} from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native'


export default class SideMenu extends Component {
  constructor(props){
      super(props)
      this.state = {
          data: []
      }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
              <View style={{width: 300,height: 120,backgroundColor: '#00a2ea'}}>
                  <View style={{flexDirection: 'row',alignItems: 'center'}}>
                      <Image
                          source={require('../images/citycontrol.png')}
                          style={{width: 60,height: 60,borderRadius: 30}}
                      />
                      <Text>{'请登录'}</Text>
                  </View>
              </View>
              <View style={{width: 300,height: 50}}>
                  <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('HomePage',{
                            itemId: 'homepage'
                        });
                        this.props.navigation.closeDrawer();
                      }}
                      style={{flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: '#f4f4f4', alignItems: 'center',paddingLeft: 30}}
                    >
                      <Image
                          source={require('../images/citycontrol.png')}
                          style={{width: 50,height: 50,borderRadius: 30}}
                      />
                      <Text style={{color: '#000',flex: 1,marginLeft: 30}}>首页</Text>
                  </TouchableOpacity>
              </View>
              {
                  this.state.data && this.state.data.map((item,index)=>{
                      return (
                          <View key={index}>
                              <TouchableOpacity
                                  onPress={() => {
                                      this.props.navigation.navigate('ContentPage',{
                                          itemId: item.id
                                      });
                                      this.props.navigation.closeDrawer();
                                  }}
                                  style={{flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: '#f4f4f4', alignItems: 'center',paddingLeft: 30}} 
                              >
                                  <Image
                                      source={{uri:item.thumbnail}}
                                      style={{width: 50,height: 50, borderRadius: 25}}
                                  />
                                  <Text style={{color: '#000',flex: 1,marginLeft: 30}}>{item.name}</Text>
                              </TouchableOpacity>
                          </View>
                      )
                  })
              }
        </View>
      </View>
    );
  }
  componentDidMount(){
      fetch('http://news-at.zhihu.com/api/4/themes')
      .then(res=> res.text() )
      .then(responseText=>{
          let da = eval("(" + responseText + ")")
          this.setState({data: da.others})
      })
  }
}