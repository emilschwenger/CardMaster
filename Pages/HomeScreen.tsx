import React from 'react';
import { Text, StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { getParseTreeNode } from 'typescript';
import { CMHeader } from '../Components/CMHeader';
import HomeMenuItem from '../Components/HomeMenuItem';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface HomeScreenProps {
  navigation: any
}

export class HomeScreen extends React.Component<HomeScreenProps,{}> {
  render() {
    return (
      <View >
        <CMHeader title='CardMaster'/>
        <ScrollView style={style.container}>
          <View style={{width: screenWidth}}>
            <HomeMenuItem title='Storage' img={require('../assets/menu_storage.jpg')} performOnClick={() => {this.props.navigation.navigate('Storage')}}/>
            <HomeMenuItem title='Study Cards' img={require('../assets/menu_learn.jpg')} performOnClick={() => {this.props.navigation.navigate('SelectStudyBox')}}/>
            <HomeMenuItem title='Settings' img={require('../assets/menu_settings.jpg')} performOnClick={() => {this.props.navigation.navigate('Settings')}}/>
            <View style={style.placeholder}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create(
  {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'white',
    },
    placeholder: {
      width: '100%',
      height: 20,
    },
  }
);