import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import Prod from '../components/Prod';

SplashScreen.preventAutoHideAsync();
export default function Produto({ navigation }) {
    const [produto, setProduto] = useState([]);
    const [pages, setPages] = useState([])
    const [curPage, setCurPage] = useState(1)

    useEffect(() => {
        function carregarProduto() {
            const options = { method: 'GET' };

            fetch('https://lamaison.glitch.me/produto/page/' + curPage, options)
                .then(response => response.json())
                .then(resp => {
                    setProduto(resp.produtos)
                    let aux = []
                    for (let i = 1; i <= Math.ceil(resp.count / 15); i++) {
                        aux.push(i)
                    }
                    setPages(aux)
                })
        }
        carregarProduto()
        // setTimeout(() => {
        //     carregarProduto()
        // }, 500)
    }, [curPage])

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

    return (
        <View style={styles.v} onLayout={onLayoutRootView}>
            <ScrollView style={styles.sv}>
                
                {
                    produto.map((produto, index) => {
                        return (
                            <Prod onPress={() => navigation.navigate('Produto', {produto})} key={index} imagem={"https://lamaisontest.blob.core.windows.net/arquivos/" + produto.imagem} nome={produto.nome} valor={produto.valor} descricao={produto.descricao} desconto={produto.desconto} />
                        )
                    })
                }
                <View style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                    {
                        pages.map((page, index) => {
                            return(
                                <TouchableOpacity onPress={() => setCurPage(Number(page))} key={index} style={{marginLeft: index === 0 ? 0 : 10, padding: 10}}>
                                    <Text style={{fontSize: 20, textDecorationLine: curPage === page ? 'underline' : 'none'}}>{page}</Text>
                                </TouchableOpacity>
                            )
                        })
                        
                    }
                </View>
            </ScrollView>
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
        paddingTop: 50
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