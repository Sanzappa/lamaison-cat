import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
SplashScreen.preventAutoHideAsync();

export default function Prod(props) {
    const produto = props

    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.veic, borderTopColor: 'black', borderTopWidth: 1}}>
            <Image source={{uri: props.imagem}} style={{ width: 150, height: 250 }} /> 
            <View style={styles.veicL} >
                <View style={{flexShrink: 1}}>
                    <Text style={styles.info}>{produto.nome}</Text>
                </View>
                <Text style={{...styles.info, fontSize: 50}}>{produto.valor}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viBTN: {
        display: "flex",
        flexDirection: "row",
        gap: 30
    },
    v: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#dce5fd",
        width: "100%",
        flex: 1,
        padding: 20
    },
    sv: {
        height: "100%",
        backgroundColor: "#46589c",
        width: "100%",
    },
    btn: {
        marginTop: 5,
        height: 40,
        width: 100,
        backgroundColor: "#2f8f5b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "Black",
        borderWidth: 1,
        borderRadius: 10
    },
    te: {
        fontSize: 10
    },
    veic: {
        width: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 30,
        alignItems: "center",
    },
    veicL: {
        flex: 1,
        padding: 20,
        flexWrap: 'wrap'
    },
    info: {
        fontSize: 30,
        color: "#000000",
        fontFamily: 'kaneda_gothic',
        flexWrap: 'wrap'
    },
    infoP: {
        fontSize: 11,
        fontWeight: "normal",
        color: "#000"
    },
    text: {
        fontSize: 45,
        color: "#2f8f5b"
    },
    textBt: {
        color: "#fff"
    }

});