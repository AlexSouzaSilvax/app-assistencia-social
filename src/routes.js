import React from "react";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Cras from "./pages/App/Cras";
import Creas from "./pages/App/Creas";
import PostosSaude from "./pages/App/PostosSaude";

import colors from "./styles/colors";

const Routes = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Cras: {
        screen: Cras,
        navigationOptions: {
          title: "CRAS",
          tabBarIcon: ({ focused }) => (
            <IconFontAwesome
              name="user"
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
      },
      PostosSaude: {
        screen: PostosSaude,
        navigationOptions: {
          title: "POSTOS DE SAÚDE",
          tabBarIcon: ({ focused }) => (
            <IconFontAwesome
              name="hospital-o"
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
  )
);

export default Routes;
