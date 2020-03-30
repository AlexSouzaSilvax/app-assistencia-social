import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { withNavigation } from "react-navigation";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { KEY_API_GOOGLE_MAPS } from "../service/api";
import colors from "../styles/colors";

function Card({
  nome,
  endereco,
  telefone,
  turnoAtendimento,
  latitude,
  longitude,
  onPressMapa,
  onPressWhatsApp,
  onPressEmail
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
      <TouchableOpacity onPress={onPressMapa}>
        <Image
          style={styles.mapa}
          defaultSource={require("../../assets/loading.gif")}
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=18&size=600x300&maptype=hybrid&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${KEY_API_GOOGLE_MAPS}`
          }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
        <TouchableOpacity onPress={onPressEmail}>
          <IconIonicons
            name={"ios-mail"}
            size={23}
            color={colors.primaryColor}
            style={styles.email}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressWhatsApp}>
          <IconFontAwesome
            name={"whatsapp"}
            size={20}
            color={colors.primaryColor}
            style={styles.whatsApp}
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.white,
    paddingTop: 5
  },
  textTitulo: {
    paddingTop: 15,
    fontSize: 25,
    color: "#444",
    margin: 1
  },
  mapa: {
    width: Dimensions.get("screen").width - 40,
    height: 120,
    alignSelf: "center",
    borderRadius: 6,
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
  },
  whatsApp: {
    alignSelf: "flex-end",
    paddingEnd: 20,
    paddingTop: 5,
    marginVertical: 3
  },
  email: {
    alignSelf: "flex-end",
    paddingEnd: 15,
    paddingTop: 4,
    marginVertical: 3
  }
});
