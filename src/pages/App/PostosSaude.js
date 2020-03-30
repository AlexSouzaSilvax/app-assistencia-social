import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  BackHandler,
  Linking
} from "react-native";
import { Spinner } from "native-base";
import { createFilter } from "react-native-search-filter";
import OpenMap from "react-native-open-map";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Dialog from "react-native-dialog";
import Header from "../../components/Header";
import Pesquisa from "../../components/Pesquisa";
import CardPostosSaude from "../../components/Card";
import { api } from "../../service/api";
import colors from "../../styles/colors";

export default function PostosSaude({ navigation }) {
  const [cardPesquisa, setCardPesquisa] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const [loading, setLoading] = useState();
  const [postosSaudeLista, setPostosSaudeLista] = useState();
  const [postosSaudePesquisa, setPostosSaudePesquisa] = useState();
  const parametrosPesquisa = [
    "bairro",
    "categoriaUnidade",
    "cep",
    "cidade",
    "cnpj",
    "cep",
    "codCnes",
    "codIbge",
    "codUnidade",
    "descricaoCompleta",
    "esferaAdministrativa",
    "fluxoClientela",
    "logradouro",
    "natureza",
    "nomeFantasia",
    "numero",
    "retencao",
    "telefone",
    "tipoUnidade",
    "tipoUnidadeCnes",
    "turnoAtendimento",
    "uf"
  ];
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [dialogEmailVisible, setDialogEmailVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");

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
      getPostosSaude(latitude, longitude);
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }

  async function getPostosSaude(latitude, longitude) {
    await api
      .get(
        `/estabelecimentos/latitude/${latitude}/longitude/${longitude}/raio/100`
      )
      .then(response => {
        setLoading(false);
        setPostosSaudeLista(response.data);
        setPostosSaudePesquisa(response.data);
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
    setPostosSaudeLista(
      postosSaudePesquisa.filter(createFilter(p, parametrosPesquisa))
    );
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

  function enviaMsgWhatsApp(nome, endereco) {
    Linking.openURL(
      `whatsapp://send?text=Olá, aqui está o endereço do *${nome}*\n\n${endereco}`
    );
  }

  function enviaMsgEmail(email, nome, endereco) {
    Linking.openURL(
      `mailto:${email}?subject=Endereço: ${nome}&body=\nOlá,\n\nSegue abaixo o endereço do ${nome}\n\n\n${endereco}\n\n\n\nEnviado do aplicativo "Assistência Social".\n\n`
    );
  }

  function limpaCampos() {
    setEmail("");
    setNome("");
    setEndereco("");
    setDialogEmailVisible(false);
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("PostosSaude");
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {!cardPesquisa ? (
        <Header
          titulo="Postos de Saúde"
          pesquisa
          onPressPesquisa={showCardPesquisa}
        />
      ) : (
        <Pesquisa
          placeHolder="Pesquisar postos de saúde"
          valor={pesquisa}
          onChangeText={p => pesquisar(p)}
          onPressBackPesquisa={() => {
            showCardPesquisa();
            getPostosSaude(latitude, longitude);
          }}
        />
      )}

      <View style={styles.body}>
        {loading ? (
          <View style={styles.containerLoading}>
            <Spinner color={colors.primaryDarkColor} />
          </View>
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={postosSaudeLista}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CardPostosSaude
                  key={(item, index) => index.toString()}
                  nome={item.nomeFantasia}
                  endereco={`${item.logradouro}, ${item.numero}, ${item.bairro} - ${item.cidade}, ${item.uf}`}
                  telefone={item.telefone}
                  turnoAtendimento={item.turnoAtendimento}
                  latitude={item.lat}
                  longitude={item.long}
                  onPressMapa={() =>
                    abrirMapa(item.nomeFantasia, item.lat, item.long)
                  }
                  onPressWhatsApp={() =>
                    enviaMsgWhatsApp(
                      item.nomeFantasia,
                      `${item.logradouro} ${item.numero}, ${item.cidade}, ${item.uf}`
                    )
                  }
                  onPressEmail={() => {
                    setNome(item.nomeFantasia);
                    setEndereco(
                      `${item.logradouro}, ${item.numero}, ${item.bairro} - ${item.cidade}, ${item.uf}`
                    );
                    setDialogEmailVisible(true);
                  }}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getLocalizacao}
                />
              }
              ListEmptyComponent={
                <View style={styles.viewListaVazia}>
                  <Text style={styles.textPostosSaudeNaoEncontrado}>
                    Nenhum posto de saúde encontrado
                  </Text>
                </View>
              }
            />

            <Dialog.Container
              visible={dialogEmailVisible}
              onBackButtonPress={() => setDialogEmailVisible(false)}
            >
              <Text style={styles.textPopUpValor}>Email</Text>

              <View style={styles.viewPopUpInput}>
                <Dialog.Input
                  style={styles.inputEmailPopUp}
                  placeholder={"Email do destinatário"}
                  placeholderTextColor={"#ddd"}
                  keyboardType={"email-address"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  numberOfLines={1}
                  autoFocus={true}
                  value={email}
                  onChangeText={e => setEmail(e)}
                ></Dialog.Input>
              </View>

              <Dialog.Button label="Cancelar" onPress={() => limpaCampos()} />
              <Dialog.Button
                label="Enviar"
                onPress={() => {
                  if (email) {
                    enviaMsgEmail(email, nome, endereco);
                  } else {
                    limpaCampos();
                    Alert.alert("Email é obrigatório");
                  }
                }}
              />
            </Dialog.Container>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDarkColor
  },
  body: {
    flex: 1,
    backgroundColor: colors.primaryLightColor
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center"
  },
  textPostosSaudeNaoEncontrado: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 18
  },
  viewListaVazia: {
    marginTop: 20,
    backgroundColor: colors.primaryLightColor
  },
  textPopUpValor: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  viewPopUpInput: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 10
  },
  inputEmailPopUp: {
    fontSize: 18,
    color: "#444",
    padding: 3,
    width: 220
  }
});
