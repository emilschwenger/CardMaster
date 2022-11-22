import React from "react";
import { StyleSheet, Text, ScrollView , View} from "react-native";
import { Button } from '@rneui/themed';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import * as SQLite from 'expo-sqlite';
import { ListItem } from '@rneui/themed'
import { CMHeader } from "../Components/CMHeader";

interface StorageScreenProps {
    navigation: any
  }

interface StorageScreenState {
    boxList: Array<SQLiteHelper.box>
}

export class StorageScreen extends React.Component<StorageScreenProps, StorageScreenState> {

    constructor(props: any) {
        super(props);
        this.state = {
            boxList: []
        }
        props.navigation.addListener('state', this.navigationListener);
    }

    navigationListener = () => {
        this.updateBoxes();
    }

    deleteBox = (box: SQLiteHelper.box) => {
        SQLiteHelper.deleteBox(box.boxID, ()=> {
            this.props.navigation.navigate('Storage');
        });
    } 

    editBox = (box: SQLiteHelper.box) => {
        this.props.navigation.navigate('CardScreen',{box});
    }

    updateBoxes = () => {
        SQLiteHelper.readAllBox((results: SQLite.SQLResultSet) => {
            if(JSON.stringify(this.state.boxList)==JSON.stringify(results.rows._array)) {
                return;
            }
            this.setState({
                boxList: results.rows._array
            });
        });
    }

    componentDidMount(): void {
        this.updateBoxes();
    }

    render () {

        return (
            <View>
                <CMHeader title="CardMaster"/>
                <View>
                    <View style={{height: 5}}/>
                    <Button title={'Create new box'} onPress={()=>{this.props.navigation.navigate('CreateNewBox')}}/>
                    <View style={{height: 5}}/>
                    <Button title={'Back'} onPress={()=>{
                        this.props.navigation.navigate('Home');
                    }}/>
                    <View style={{height: 5}}/>
                </View>
                <ScrollView>
                    {
                        this.state.boxList.map((l: SQLiteHelper.box, i)=>(
                            <ListItem key={i}>
                                <ListItem.Content style={style.listItemStyle}>
                                        <ListItem.Title style={style.textStyle}>{l.name}</ListItem.Title>
                                        <View style={style.buttonContainer}>
                                            <Button title={'Edit'} onPress={() => this.editBox(l)}/>
                                            <Button title={'Delete'} onPress={() => this.deleteBox(l)}/>
                                        </View>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </View>
            );
    }
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
        width: 130
    }
});