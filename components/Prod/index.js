import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-web';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Prod(props) {
    const [image, setImage] = useState(null)

    const produto = props

    useEffect(() => {
        fetch('http://localhost:5000/arquivos/' + produto.imagem , {method: 'GET'})
        .then(response => response.blob())
        .then(response => {
            const objectURL = URL.createObjectURL(response);
            setImage(objectURL)
        })
    }, [])

    return (
        <View style={styles.veic}>
            <View style={styles.veicL} >
                <Text style={styles.info}>Nome : {produto.nome}</Text>
                <Text style={styles.info}>Valor : {produto.valor}</Text>
                <Text style={styles.info}>Descrição : {produto.descricao}</Text>
                <Image source={image === null ? {uri: ""} : {uri: image}} style={{ width: 100, height: 100 }} /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viBTN: {
        display: "flex",
        flexDirection: "row",
        gap: "30px"
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
        borderWidth: "1px",
        borderRadius: "10px"
    },
    te: {
        fontSize: "10pt"
    },
    veic: {
        width: "100%",
        height: "250px",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: "20px",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "30px"
    },
    veicL: {
        maxWidth: "78%"
    },
    info: {
        fontSize: "13pt",
        fontWeight: "bold",
        color: "#000000"
    },
    infoP: {
        fontSize: "11pt",
        fontWeight: "normal",
        color: "#000"
    },
    text: {
        fontSize: "30pt",
        color: "#2f8f5b"
    },
    textBt: {
        color: "#fff"
    }

});