import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
import * as SQLiteHelper from './Utils/SQLiteHelper'
import { HomeScreen } from './Pages/HomeScreen';
import { StorageScreen } from './Pages/StorageScreen';
import { StudyCardsScreen } from './Pages/StudyCardsScreen';
import { SettingsScreen } from './Pages/SettingsScreen';
import { CreateNewBox } from './Pages/CreateBoxScreen';
import { CardScreen } from './Pages/CardScreen';
import { SelectStudyBox } from './Pages/SelectStudyBoxScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const databaseSetup = () => {
    SQLiteHelper.checkBoxTable();
    SQLiteHelper.checkCardTable();
  }

  databaseSetup();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Storage' component={StorageScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={SettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='CreateNewBox' component={CreateNewBox} options={{headerShown: false}}/>
        <Stack.Screen name='CardScreen' component={CardScreen} options={{headerShown: false}}/>
        <Stack.Screen name='StudyCards' component={StudyCardsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SelectStudyBox' component={SelectStudyBox} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}