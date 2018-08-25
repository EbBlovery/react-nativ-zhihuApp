/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import SideMenu from './app/scroller_list/index.js'
import HomePage from './app/homepage/index.js'
import ContentPage from './app/contentpage/index.js'
import DetailsPage from './app/detailspage/index.js'


class TouchableMenuIcon extends Component {    
    toggleDrawer=() => {
        this.props.navigationProps.toggleDrawer()
    }
    render(){
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <Image 
                        source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}
                        style={{width:25,height:25,marginLeft: 5}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const RootStack = createStackNavigator(
    {
        HomePage: HomePage,
        ContentPage: ContentPage,
        DetailsPage: DetailsPage
    },{
        initialRouteName: 'HomePage',  
        navigationOptions: ({ navigation }) => ({
            title: "Root Stack", 
            headerLeft: <TouchableMenuIcon navigationProps={ navigation }/>,
            headerStyle: {
                backgroundColor: '#00a2e2',
                height: 70,
            },
        })
    }
)

export default createDrawerNavigator(
    {
        contentOptions: RootStack
    },{
        contentComponent: SideMenu
    }
)