import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Load from "./pages/Load";

import Cras from "./pages/App/Cras";
import Creas from "./pages/App/Creas";

import colors from "./styles/colors";

const Routes = createAppContainer(
  createStackNavigator({
    Load: {
      screen: Load,
      navigationOptions: {
        headerShown: false
      }
    },
    App: {
      screen: createMaterialBottomTabNavigator(
        {
          Cras: {
            screen: Cras,
            navigationOptions: {
              title: "CRAS",
              tabBarIcon: ({ focused }) => (
                <IconFontAwesome
                  name="users"
                  size={focused ? 24 : 22}
                  color={focused ? colors.primaryColor : colors.cinza}
                />
              )
            }
          },
          Creas: {
            screen: Creas,
            navigationOptions: {
              title: "CREAS",
              tabBarIcon: ({ focused }) => (
                <IconFontAwesome
                  name="users"
                  size={focused ? 24 : 22}
                  color={focused ? colors.primaryColor : colors.cinza}
                />
              )
            }
          }
        },
        {
          initialRouteName: "Cras",
          barStyle: {
            backgroundColor: colors.primaryLightColor
          },
          activeColor: colors.primaryColor,
          inactiveColor: colors.cinza
        }
      ),
      navigationOptions: ({ navigation }) => ({
        headerShown: false
      })
    },
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    })
  })
);

export default Routes;
