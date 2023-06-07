import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { AntDesign } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();
export default function Prod({route}) {
    const [visible, setVisible] = useState(false)

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
    

    const openLink = () => {
        fetch("https://lamaison.glitch.me/produto/" + route.params.produto.id, { method: 'GET' })
            .then(response => response.json())
            .then(async response => {
                if (response.textura !== null) {
                    await Linking.openURL('lmscan://lmscan?id=' + route.params.produto.id)
                } else {
                    ToastAndroid.show('Modelo indisponível para o produto de id ' + route.params.produto.id, ToastAndroid.SHORT)
                }
            })

    }

    return (
        <View style={styles.v} onLayout={onLayoutRootView}>
            <View style={{display: visible ? 'flex' : 'none', height: '100%', position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,.8)', zIndex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: "https://lamaisontest.blob.core.windows.net/arquivos/" + route.params.produto.imagem}} style={{width: 400, height: 620, resizeMode: 'cover'}}/>
                <AntDesign name="close" size={24} color="white" style={{position: 'absolute', top: 5, right: 5}} onPress={() => setVisible(false)}/>
            </View>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Image source={{uri: "https://lamaisontest.blob.core.windows.net/arquivos/" + route.params.produto.imagem, height: 400, width: 500}} style={{resizeMode: 'cover'}} />
            </TouchableOpacity>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 15 }}>
                <Text style={{fontSize: 38, fontFamily: 'kaneda_gothic', width: '100%', textAlign: 'center'}}>{route.params.produto.nome}</Text>
                <Text>{route.params.produto.descricao}</Text>
                {route.params.produto.desconto > 0 && <Text style={{textDecorationLine: 'line-through', fontSize: 22}}>R$ {(route.params.produto.valor).toFixed(2).replace('.',',')}</Text>}
                <Text style={{fontFamily: 'kaneda_gothic', fontSize: 50}}>R$ {(route.params.produto.valor - route.params.produto.valor * route.params.produto.desconto / 100).toFixed(2).replace('.',',')}</Text>
                <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical: 10}}>
                    <TouchableOpacity onPress={openLink} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                        <Text style={{color: 'white', fontFamily: 'kaneda_gothic', fontSize: 38, padding: 10}}>Projetar Realidade Aumentada</Text>
                    </TouchableOpacity>
                </View>
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
        paddingTop: 0,
        position: 'relative'
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