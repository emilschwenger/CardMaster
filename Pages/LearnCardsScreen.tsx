import React from "react";
import { Text, View } from "react-native";
import { Button } from '@rneui/base';
import * as SQLiteHelper from '../Utils/SQLiteHelper';
import * as SQLite from 'expo-sqlite';

export class LearnCardsScreen extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render () {
        return (
                <Text>LearnCardsScreen</Text>
            );
    }
}