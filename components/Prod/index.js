import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Prod(props) {
    const produto = props

    return (
        <TouchableOpacity onPress={props.onPress} style={styles.veic}>
            <View style={styles.veicL} >
                <Text style={styles.info}>Nome : {produto.nome}</Text>
                <Text style={styles.info}>Valor : {produto.valor}</Text>
                <Text style={styles.info}>Descrição : {produto.descricao}</Text>
                <Image source={{uri: props.imagem}} style={{ width: 100, height: 100 }} /> 
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
        height: 250,
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 30
    },
    veicL: {
        maxWidth: "78%"
    },
    info: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#000000"
    },
    infoP: {
        fontSize: 11,
        fontWeight: "normal",
        color: "#000"
    },
    text: {
        fontSize: 30,
        color: "#2f8f5b"
    },
    textBt: {
        color: "#fff"
    }

});