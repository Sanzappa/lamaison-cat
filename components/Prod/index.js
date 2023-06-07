import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
SplashScreen.preventAutoHideAsync();

export default function Prod(props) {
    const produto = props

    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.veic, borderBottomColor: 'black', marginBottom: 15, paddingTop: 0}}>
            <Image source={{uri: props.imagem, height: 160, width: "100%"}} /> 
            <View style={styles.veicL} >
                <View style={{flexShrink: 1, width: '100%'}}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.info}>{produto.nome}</Text>
                </View>
                {produto.desconto > 0 && <Text style={{textDecorationLine: 'line-through', fontSize: 22}}>R$ {(produto.valor).toFixed(2).replace('.',',')}</Text>}
                <Text style={{...styles.info, fontSize: 50}}>R$ {(produto.valor - produto.valor * produto.desconto / 100).toFixed(2).replace('.',',')}</Text>
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
        padding: 5
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
        width: "48%",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        paddingVertical: 30,
        alignItems: "center",
    },
    veicL: {
        flex: 1,
        padding: 20,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: "100%"
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