import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Header } from '@rneui/themed';
import * as SQLiteHelper from '../Utils/SQLiteHelper';

interface CMHeaderProps {
    title: string
}

export function CMHeader(props: CMHeaderProps) {
    return (
        <Header centerComponent={{ text: props.title, style: style.heading }} />
    )
}

const style = StyleSheet.create({
    heading: {
        fontFamily: 'sans-serif',
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    }
});