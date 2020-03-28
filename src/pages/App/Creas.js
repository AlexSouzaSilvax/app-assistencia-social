import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl
} from "react-native";
import { Spinner } from "native-base";
import { createFilter } from "react-native-search-filter";
import OpenMap from "react-native-open-map";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Header from "../../components/Header";
import Pesquisa from "../../components/Pesquisa";
import CardCreas from "../../components/Card";
import { api } from "../../service/api";
import colors from "../../styles/colors";

export default function Creas() {
  const [cardPesquisa, setCardPesquisa] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const [loading, setLoading] = useState();
  const [creasLista, setCreasLista] = useState();
  const [creasPesquisa, setCreasPesquisa] = useState();
  const parametrosPesquisa = [
    "idCreas",
    "codigoIbge",
    "regiao",
    "uf",
    "municipio",
    "nomeCreas",
    "tipoLogradouro",
    "logradouro",
    "numero",
    "bairro",
    "cep",
    "localizacaoCreas"
  ];

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    getLocalizacao();
  }, []);

  async function getLocalizacao() {
    setLoading(true);
    //pedir permissao ao usuario
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert("Para usar o app você precisar ativar o GPS");
      setLoading(false);
    } else {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      getCreas(latitude, longitude);
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }

  async function getCreas(latitude, longitude) {
    await api
      .get(`/creas/latitude/${latitude}/longitude/${longitude}/raio/10`)
      .then(response => {
        setLoading(false);
        setCreasLista(response.data);
        setCreasPesquisa(response.data);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    setPesquisa("");
  }

  function showCardPesquisa() {
    setCardPesquisa(!cardPesquisa);
    setPesquisa("");
  }

  function pesquisar(p) {
    setPesquisa(p);
    setCreasLista(creasPesquisa.filter(createFilter(p, parametrosPesquisa)));
  }

  function abrirMapa(titulo, latitude, longitude) {
    OpenMap.show({
      latitude: latitude,
      longitude: longitude,
      title: titulo,
      cancelText: "Fechar",
      actionSheetTitle: "Escolha seu app de navegação",
      actionSheetMessage: "Aplicativos disponíveis"
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {!cardPesquisa ? (
        <Header titulo="CREAS" pesquisa onPressPesquisa={showCardPesquisa} />
      ) : (
        <Pesquisa
          placeHolder="Pesquisar CREAS"
          valor={pesquisa}
          onChangeText={p => pesquisar(p)}
          onPressBackPesquisa={() => {
            showCardPesquisa();
            getCreas(latitude, longitude);
          }}
        />
      )}

      <View style={styles.body}>
        {loading ? (
          <View style={styles.containerLoading}>
            <Spinner color={colors.primaryDarkColor} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={creasLista}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CardCreas
                key={(item, index) => index.toString()}
                nome={item.nomeCreas}
                endereco={`${item.tipoLogradouro} ${item.logradouro}, ${item.numero} - ${item.bairro}, ${item.municipio} - ${item.uf}`}
                latitude={item.lat}
                longitude={item.long}
                onPress={() => abrirMapa(item.nomeCreas, item.lat, item.long)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getLocalizacao} />
            }
            ListEmptyComponent={
              <View style={{ marginTop: 20, backgroundColor: colors.white }}>
                <Text style={styles.textCrasNaoEncontrado}>
                  Nenhum CREAS encontrado
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor
  },
  body: {
    flex: 1,
    backgroundColor: colors.primaryLightColor
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center"
  },
  textCrasNaoEncontrado: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 18
  }
});
