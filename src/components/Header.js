import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
import colors from "../styles/colors";

function Header({
  navigation,
  titulo,
  voltar,
  onPressVoltar,
  pesquisa,
  onPressPesquisa
}) {
  return (
    <View style={styles.header}>
      {voltar ? (
        <View style={{ flex: 2 }}>
          <TouchableOpacity onPress={onPressVoltar}>
            <IconIonicons
              name={"ios-arrow-back"}
              size={25}
              color={colors.white}
              style={styles.iconVoltar}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 2 }} />
      )}

      <View style={{ flex: 2 }}>
        <Text numberOfLines={1} style={styles.titulo}>
          {titulo}
        </Text>
      </View>

      {pesquisa ? (
        <TouchableOpacity style={{ flex: 2 }} onPress={onPressPesquisa}>
          <Icon
            name={"search"}
            size={20}
            color={colors.white}
            style={styles.iconPesquisa}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 2 }} />
      )}
    </View>
  );
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    height: 60,
    paddingTop: 24
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center"
  },
  iconPesquisa: {
    alignSelf: "flex-end",
    paddingEnd: 15
  },
  iconVoltar: {
    alignSelf: "flex-start",
    paddingStart: 15,
    paddingTop: 5
  }
});
