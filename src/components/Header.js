import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { withNavigation } from "react-navigation";
import colors from "../styles/colors";

function Header({ titulo, pesquisa, onPressPesquisa }) {
  return (
    <View style={styles.header}>
      <IconAntDesign
        name={Platform.OS === "android" ? "android1" : "apple1"}
        size={20}
        color={colors.white}
        style={styles.iconPlatform}
      />

      <View style={{ flex: 1, alignSelf: "center" }}>
        <Text numberOfLines={1} style={styles.titulo}>
          {titulo}
        </Text>
      </View>

      {pesquisa ? (
        <TouchableOpacity onPress={onPressPesquisa}>
          <Icon
            name={"search"}
            size={20}
            color={colors.white}
            style={styles.iconPesquisa}
          />
        </TouchableOpacity>
      ) : (
        <View />
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
    ...Platform.select({
      ios: {
        paddingTop: 0,
        height: 45
      },
      android: {
        paddingTop: 24,
        height: 60
      }
    })
  },
  titulo: {
    left: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center"
  },
  iconPesquisa: {
    alignSelf: "flex-end",
    paddingEnd: 15
  },
  iconPlatform: {
    alignSelf: "flex-start",
    paddingStart: 10,
    ...Platform.select({
      ios: {
        paddingTop: 11
      },
      android: {
        paddingTop: 8
      }
    })
  }
});
