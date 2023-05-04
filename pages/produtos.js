import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-web';
import Prod from '../components/Prod';

export default function Produto({ route }) {
    const [produto, setProduto] = useState([]);

    useEffect(() => {
        function carregarProduto() {
            const options = { method: 'GET' };

            fetch('http://localhost:5000/produto', options)
                .then(response => response.json())
                .then(resp => {
                    setProduto(resp)
                })
        }

        setTimeout(() => {
            carregarProduto()
        }, 500)
    }, [produto])

    return (
        <View style={styles.v} >
            <Text style={styles.text} >Produtos</Text>
            <ScrollView>
                
                {
                    produto.map((produto, index) => {
                        return (
                            <Prod key={index} imagem={produto.imagem} nome={produto.nome} valor={produto.valor} descricao={produto.descricao} />
                        )
                    })
                }
            </ScrollView>
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