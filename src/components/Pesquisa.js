import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Input } from "native-base";
import { withNavigation } from "react-navigation";
import colors from "../styles/colors";

function Pesquisa({ placeHolder, valor, onChangeText, onPressBackPesquisa }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardPesquisa}>
        <Ionicons
          name={"ios-close"}
          size={42}
          color={"#aaaaaa"}
          style={{ alignSelf: "center", paddingStart: 10 }}
          onPress={onPressBackPesquisa}
        />
        <Input
          placeholder={placeHolder}
          placeholderTextColor="#aaaaaa"
          style={{ alignSelf: "center", marginLeft: 10, color: "#444" }}
          value={valor}
          onChangeText={onChangeText}
          autoFocus={true}
        />
        <Icon
          name={"search"}
          size={18}
          color={"#aaaaaa90"}
          style={{ alignSelf: "center", paddingEnd: 10 }}
        />
      </View>
    </View>
  );
}
export default withNavigation(Pesquisa);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    height: 70,
    justifyContent: "center"
  },
  cardPesquisa: {
    flexDirection: "row",
    height: 50,
    width: Dimensions.get("screen").width - 15,
    backgroundColor: colors.white,
    alignSelf: "center",
    borderRadius: 4
  }
});
