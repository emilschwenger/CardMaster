import React, { useEffect, useState } from "react";
import { LogBox, ScrollView, StyleSheet, Text, View } from "react-native";
import { Input, Button, Header, ListItem } from '@rneui/themed';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import { CMHeader } from "../Components/CMHeader";
import * as SQLite from 'expo-sqlite';

interface CardScreenProps {
    navigation: any,
    route: any
}

export function CardScreen(props: CardScreenProps) {
    
    const [front, setFront] = useState("");
    const [frontError, setFrontError] = useState("");
    const [back, setBack] = useState("");
    const [backError, setBackError] = useState("");
    const [boxCards, setBoxCards] = useState([]);

    const box: SQLiteHelper.box = props.route.params.box;

    const addCard = () => {
        if(!front || !back) {
            return;
        }
        SQLiteHelper.createCard({
            cardID: -1,
            boxID: box.boxID,
            vorderseite: front,
            rueckseite: back
        }, () => {
            props.navigation.navigate('CardScreen', {box});
        });
    }

    const removeCard = (card: SQLiteHelper.card) => {
        SQLiteHelper.deleteCard(card.cardID, () => {
            props.navigation.navigate('CardScreen', {box});
        });
    }

    useEffect(() => {
        SQLiteHelper.readAllCardByBoxID(box.boxID, (results: SQLite.SQLResultSet) => {
            if(JSON.stringify(boxCards)==JSON.stringify(results.rows._array)) {
                return;
            }
            setBoxCards(results.rows._array);
        });
    });

    return (
        <View style={style.container}>
            <CMHeader title="CardMaster"/>
            <View style={{marginTop: 15}}/>
            <Input
            placeholder="Front"
            value={front}
            errorMessage={frontError}
            onChangeText={(value: string)=>{
                if(!value) {
                    setFrontError("Front is empty");
                } else {
                    setFrontError("");
                }
                setFront(value);
            }}
            />
            <Input
            placeholder="Back"
            value={back}
            errorMessage={backError}
            onChangeText={(value: string)=>{
                if(!value) {
                    setBackError("Back is empty");
                } else {
                    setBackError("");
                }
                setBack(value);
            }}
            />
            <Button title={"Add"} containerStyle={style.fullSizeButton} onPress={() => {
                addCard();
            }}/>
            <Button title={"Back"} containerStyle={style.fullSizeButton} onPress={() => {
                props.navigation.navigate('Storage');
            }}/>
            <View style={style.labelContainer}>
                <Text style={style.label}>Front</Text>
                <Text style={style.label}>Back</Text>
            </View>
            <ScrollView>
                {
                    boxCards.map((l: SQLiteHelper.card, i) => (
                        <ListItem key={i}>
                            <ListItem.Content style={style.listBlockStyle}>
                                    <Button title={'X'} containerStyle={style.deleteButton} onPress={() => {removeCard(l)}}/>
                                    <ListItem.Title style={style.listElementFront}>{l.vorderseite}</ListItem.Title>
                                    <ListItem.Title style={style.listElementBack}>{l.rueckseite}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const textStyle = {
    fontFamily: 'sans-serif',
    color: 'black'
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    listBlockStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    listElementFront: {
        ...textStyle,
        width: '45%',
        paddingLeft: 10
    },
    listElementBack: {
        ...textStyle,
        width: '45%',
        textAlign: 'right',
        paddingRight: 10
    },
    labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    label: {
        ...textStyle,
        fontWeight: 'bold',
        fontSize: 18
    },
    fullSizeButton:{
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    deleteButton: {
        width: '10%'
    }
});