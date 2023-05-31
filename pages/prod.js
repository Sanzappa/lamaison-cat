import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
export default function Prod({route}) {

    const [fontsLoaded] = useFonts({
        'kaneda_gothic': require('./font/kaneda/kaneda-gothic-regular-webfont.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const openLink = (produto) => {
        fetch("https://lamaison.glitch.me/produto/" + produto.id, { method: 'GET' })
            .then(response => response.json())
            .then(async response => {
                if (response.textura !== null) {
                    await Linking.openURL('lmscan://lmscan?id=' + produto.id)
                } else {
                    ToastAndroid.show('Modelo indisponível para o produto de id ' + produto.id, ToastAndroid.SHORT)
                }
            })

    }

    return (
        <View style={styles.v} onLayout={onLayoutRootView}>
            <Image source={{uri: "https://lamaisontest.blob.core.windows.net/arquivos/" + route.params.produto.imagem, height: 400, width: 500}} style={{resizeMode: 'cover'}} />
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <Text>{route.params.produto.nome}</Text>
            </View>
        </View>
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
        backgroundColor: "#fff",
        width: "100%",
        flex: 1,
        padding: 15,
        paddingTop: 0
    },
    sv: {
        height: "100%",
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
        fontSize: 36,
        color: "#fff",
        fontFamily: 'kaneda_gothic',
        padding: 10
    },
    textBt: {
        color: "#fff"
    }

});