import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from '@rneui/base';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import * as SQLite from 'expo-sqlite';
import { CMHeader } from "../Components/CMHeader";

interface StudyCardsScreenProps {
    navigation: any,
    route: any
}

interface StudyCardsScreenState {
    currentCard: SQLiteHelper.card,
    cardFace: boolean,
    finished: boolean
}

export class StudyCardsScreen extends React.Component<StudyCardsScreenProps,StudyCardsScreenState> {

    currentBox: SQLiteHelper.box = this.props.route.params.box;

    cardList: Array<SQLiteHelper.card>;

    constructor(props: StudyCardsScreenProps) {
        super(props);
        this.state = {
            currentCard: {cardID: -1, boxID: -1, rueckseite: 'Empty', vorderseite: 'empty'},
            cardFace: false,
            finished: false
        }
        SQLiteHelper.readAllCardByBoxID(props.route.params.box.boxID, (results: SQLite.SQLResultSet) => {
            this.cardList = results.rows._array;
            this.selectRandomCard();
        });
    }

    selectRandomCard = () => {
        if(this.cardList.length==0) {
            console.log('No cards left to study');
            this.setState({
                finished: true
            });
            return;
        }
        let index: number = Math.floor(Math.random() * this.cardList.length);
        this.setState({
            currentCard: this.cardList[index],
            cardFace: false
        });
        this.cardList.splice(index, 1);
    }

    quitStudy = () => {
        this.props.navigation.navigate('SelectStudyBox');
    }

    render () {

        let CardElement: any;

        if(this.state.finished) {
            //no cards left
            CardElement = <Text style={style.cardViewTextStyle}>Finished</Text>
        } else {
            if(this.state.cardFace) {
                //rueckseite
                CardElement = <Text style={style.cardViewTextStyle}>{this.state.currentCard.rueckseite}</Text>
            } else {
                //vorderseite
                CardElement = <Text style={style.cardViewTextStyle}>{this.state.currentCard.vorderseite}</Text>
            }
        }

        return (
                <View style={style.container}>
                    <CMHeader title="CardMaster"/>
                    <View style={style.controllContainer}>
                        <Button title={'Quit'} containerStyle={style.quitButton} onPress={() => {this.quitStudy()}}/>
                        <View style={style.cardView}>
                            {CardElement}
                        </View>
                        <View>
                            <Button title={'Answer'} onPress={() => {
                                this.setState({
                                    cardFace: !this.state.cardFace
                                });
                            }}/>
                            <View style={style.buttonContainer}>
                                <Button containerStyle={style.halfSizeButton} title={'Retry Card'} onPress={() => {
                                    this.cardList.push(this.state.currentCard);
                                    this.selectRandomCard();
                                }}/>
                                <Button containerStyle={style.halfSizeButton} title={'Next'} onPress={() => this.selectRandomCard()}/>
                            </View>
                        </View>
                    </View>
                </View>
            );
    }
}

const textStyle = {
    fontFamily: 'sans-serif',
    color: 'black',
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
        flexGrow: 3,
        padding: 15
    },
    cardViewTextStyle: {
        ...textStyle,
        fontSize: 20
    }
});