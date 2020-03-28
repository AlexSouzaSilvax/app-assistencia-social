import React, { useEffect } from "react";
import { View, StyleSheet, Image, BackHandler, StatusBar } from "react-native";
import { Spinner } from "native-base";
import logo from "../../assets/logo.png";
import colors from "../styles/colors";
import { sleep } from "../service/api";

export default function Load({ navigation }) {
  useEffect(() => {
    sleep(1000);
    navigation.navigate("App");
  }, []);

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Load");
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={logo} style={styles.logo} />
      <Spinner color={colors.white} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primaryColor
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center"
  },
  spinner: {
    paddingTop: 100
  }
});
