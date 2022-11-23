import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from '@rneui/base';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import * as SQLite from 'expo-sqlite';
import { CMHeader } from "../Components/CMHeader";

interface StudyCarsScreenProps {
    navigation: any,
    route: any
}

export class StudyCardsScreen extends React.Component<StudyCarsScreenProps,{}> {

    currentBox: SQLiteHelper.box = this.props.route.params.box;

    constructor(props: any) {
        super(props);
    }

    quitStudy = () => {
        this.props.navigation.navigate('SelectStudyBox');
    }

    render () {

        return (
                <View style={style.container}>
                    <CMHeader title="CardMaster"/>
                    <View style={style.controllContainer}>
                        <Button title={'Quit'} containerStyle={style.quitButton} onPress={() => {this.quitStudy()}}/>
                        <View style={style.cardView}>
                            <Text>Current box: {this.currentBox.name}</Text>
                        </View>
                        <View>
                            <Button title={'Answer'}/>
                            <View style={style.buttonContainer}>
                                <Button containerStyle={style.halfSizeButton} title={'Previous'}/>
                                <Button containerStyle={style.halfSizeButton} title={'Next'}/>
                            </View>
                        </View>
                    </View>
                </View>
            );
    }
}

const textStyle = {
    fontFamily: 'sans-serif',
    color: 'black'
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    controllContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '96%',
        marginLeft: '2%',
        flexGrow: 3
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5
    },
    halfSizeButton: {
        width: '48%'
    },
    quitButton: {
        paddingTop: 5
    },
    cardView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        flexGrow: 3
    }
});