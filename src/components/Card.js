import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";
import { KEY_API_GOOGLE_MAPS } from "../service/api";
import colors from "../styles/colors";

function Card({
  nome,
  endereco,
  telefone,
  turnoAtendimento,
  latitude,
  longitude,
  onPress
}) {
  return (
    <View style={styles.card}>
      <Text numberOfLines={1} style={styles.textNome}>
        {nome}
      </Text>
      <Text numberOfLines={1} style={styles.textEndereco}>
        {endereco}
      </Text>
      {telefone ? (
        <Text numberOfLines={1} style={styles.textEndereco}>
          Tel.: {telefone}
        </Text>
      ) : (
        <></>
      )}
      {turnoAtendimento ? (
        <Text numberOfLines={1} style={styles.textEndereco}>
          {turnoAtendimento}
        </Text>
      ) : (
        <></>
      )}
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.mapa}
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=18&size=600x300&maptype=hybrid&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${KEY_API_GOOGLE_MAPS}`
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Card);

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: Dimensions.get("screen").width - 20,
    margin: 5,
    borderRadius: 4,
    backgroundColor: colors.primaryLightColor,
    paddingTop: 5
  },
  textTitulo: {
    paddingTop: 15,
    fontSize: 25,
    color: "#444",
    margin: 1
  },
  mapa: {
    width: Dimensions.get("screen").width - 20,
    height: 150,
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 10
  },
  textNome: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginStart: 5,
    marginTop: 10
  },
  textEndereco: {
    fontSize: 10,
    alignSelf: "flex-start",
    marginStart: 5,
    marginTop: 3
  }
});
