import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Input, Button, ListItem } from '@rneui/themed';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import { CMHeader } from "../Components/CMHeader";
import * as SQLite from 'expo-sqlite';


interface SelcetStudyBoxProps {
    navigation: any
}

interface SelectStudyBoxState {
    boxList: []
}

export function SelectStudyBox (props: SelcetStudyBoxProps) {

    const [boxList, setBoxList] = useState([]);

    useEffect(() => {
        SQLiteHelper.readAllBox((results: SQLite.SQLResultSet) => {
            setBoxList(results.rows._array);
        });
    }, []);

    const studyBox = (box: SQLiteHelper.box) => {
        props.navigation.navigate('StudyCards', {box});
    }

    return (
        <View>
            <CMHeader title="CardMaster"/>
            <View>
                <View style={{height: 5}}/>
                <Button title={'Back'} onPress={()=>{
                    console.log(props);
                    props.navigation.navigate('Home');
                }}/>
                <View style={{height: 5}}/>
            </View>
            <ScrollView>
                {
                    boxList.map((l: SQLiteHelper.box, i)=>(
                        <ListItem key={i}>
                            <ListItem.Content style={style.listItemStyle}>
                                    <ListItem.Title style={style.textStyle}>{l.name}</ListItem.Title>
                                    <View style={style.buttonContainer}>
                                        <Button title={'Study'} onPress={() => studyBox(l)}/>
                                    </View>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    listItemStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: 'black',
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 65
    }
});