import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function telaLogin({ navigation }) {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [at, setAt] = useState(false)
    const [info] = useState([])

    const storeData = async () => {

        info.push(email)
        try {
            await AsyncStorage.setItem('Info', JSON.stringify(info))
        } catch (e) {
            // saving error
        }
    }

    const verificar = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "senha": senha
            })
        };

        fetch('http://localhost:5000/usuarioLogin', options)
            .then(response => response.json())
            .then(response => {
                if (response.validacao === true) {
                    navigation.navigate("Produtos")
                    storeData()
                }else{
                    setAt(true)
                }
            })
    }

    return (
        <View style={styles.v}>
            <Text style={styles.text} >LaMaison</Text>
            <TextInput style={{ ...styles.inp1, borderBottomWidth: at ? 4 : 2, borderColor: at ? "red" : "black" }} placeholder="Email" onChangeText={(email) => { setEmail(email) }} />
            <TextInput secureTextEntry={true} style={styles.inp2} placeholder="Senha" onChangeText={(senha) => { setSenha(senha) }} />
            <TouchableOpacity style={styles.btn} onPress={verificar}><Text style={styles.t}>Login</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    v: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    inp1: {
        height: 40,
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginTop: 20,
        paddingLeft: 10,
    },
    inp2: {
        height: 40,
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderBottomWidth: 2,
        marginTop: 20,
        paddingLeft: 10
    },
    btn: {
        height: 40,
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        marginTop: 20,
        borderRadius: 5
    },
    t: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18
    },
    text: {
        color: "black",
        fontSize: 75
    }
});