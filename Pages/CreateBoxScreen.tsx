import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from '@rneui/themed';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import { CMHeader } from "../Components/CMHeader";

interface CreateNewBoxProps {
    navigation: any
}

export function CreateNewBox(props: CreateNewBoxProps) {

    const [boxName, setBoxName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <View>
            <CMHeader title="CardMaster"/>
            <Input placeholder="Box name" value={boxName} 
            onChangeText={(value: string) => {
                if(value.length > 15) {
                    setErrorMessage('Maximum 15 characters');
                } else {
                    setBoxName(value);
                    setErrorMessage('');
                }
            }} 
            errorMessage={errorMessage}
            />
            <Button title={'Create'} onPress={()=>{
                if(!boxName) {
                    setErrorMessage('Name must not be empty')
                    return;
                }
                SQLiteHelper.createBox(boxName, () => {
                    props.navigation.navigate('Storage');
                });
            }} />
            <View style={{height: 5}}/>
            <Button title={'Back'} onPress={()=>{
                props.navigation.navigate('Storage');
            }} />
        </View>
        );
}

const style = StyleSheet.create({
    container: {
        width: '100%'
    }
});