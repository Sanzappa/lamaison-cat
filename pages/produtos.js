import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import Prod from '../components/Prod';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'


SplashScreen.preventAutoHideAsync();
export default function Produto({ navigation }) {
    const [produto, setProduto] = useState([]);
    const [pages, setPages] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [search, setSearch] = useState('')

    useEffect(() => {
        function carregarProduto() {
            const options = { method: 'GET' };

            fetch('https://lamaison.glitch.me/produto/page/' + curPage + '?np=12&' + search, options)
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
    }, [curPage, search])

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
            <View style={{width: '100%', position: 'relative', justifyContent: 'center', marginBottom: 10}}>
                <TextInput onChangeText={(v) => setSearch("nome=" + v)} placeholder={'Pesquisar produto...'} style={{width: '100%', padding: 10, backgroundColor: 'white', fontFamily: 'kaneda_gothic', letterSpacing: 1.8, fontSize: 18}} placeholderTextColor={'#777'} />
                <FontAwesome5 name="search" size={20} color="black" style={{position: 'absolute', right: 10}} />
            </View>
            <ScrollView style={styles.sv}>
                <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    produto.map((produto, index) => {
                        return (
                            <Prod i={index} onPress={() => navigation.navigate('Produto', {produto})} key={index} imagem={"https://lamaisontest.blob.core.windows.net/arquivos/" + produto.imagem} nome={produto.nome} valor={produto.valor} descricao={produto.descricao} desconto={produto.desconto} />
                        )
                    })
                }
                {produto.length < 1 && 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <Text style={{fontFamily: 'kaneda_gothic', color: '#777', fontSize: 30}}>Nenhum Produto Encontrado :(</Text>
                    </View>
                }
                </View>
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
        backgroundColor: "#f0f0f0",
        width: "100%",
        flex: 1,
        padding: 15
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