import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  IconButton,
  MD3Colors,
  Appbar
} from "react-native-paper";
import { customTheme } from "./src/config/theme";

export default function App(): JSX.Element {
  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      ...customTheme.colors
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <PaperProvider theme={theme}>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => {}} />
          <Appbar.Content title="ВНИТИП" />
          <Appbar.Action icon="calendar" onPress={() => {}} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        <View style={styles.menu}>
          <View
            style={[
              styles.menuButton,
              { backgroundColor: theme.colors.secondary }
            ]}
          >
            <IconButton
              icon="account"
              iconColor={MD3Colors.neutral90}
              size={80}
            />
            <Text style={styles.menuText}>Авторизация</Text>
          </View>

          <View
            style={[
              styles.menuButton,
              { backgroundColor: theme.colors.menuRed }
            ]}
          >
            <IconButton
              icon="plus-circle-outline"
              iconColor={MD3Colors.neutral99}
              size={80}
            />
            <Text style={styles.menuText}>Новый документ</Text>
          </View>

          <View
            style={[
              styles.menuButton,
              { backgroundColor: theme.colors.menuOrange }
            ]}
          >
            <IconButton
              icon="play-circle-outline"
              iconColor={MD3Colors.neutral90}
              size={80}
            />
            <Text style={styles.menuText}>Продолжить</Text>
          </View>

          <View
            style={[
              styles.menuButton,
              { backgroundColor: theme.colors.menuPurple }
            ]}
          >
            <IconButton
              icon="file-search-outline"
              iconColor={MD3Colors.neutral90}
              size={80}
            />
            <Text style={styles.menuText}>Каталог документов</Text>
          </View>

          <View
            style={[
              styles.menuButton,
              { backgroundColor: theme.colors.menuGreen }
            ]}
          >
            <IconButton
              icon="cloud-outline"
              iconColor={MD3Colors.neutral90}
              size={80}
            />
            <Text style={styles.menuText}>Отправить документ</Text>
          </View>

          <View
            style={[
              styles.menuButton,
              { backgroundColor: theme.colors.menuBlue }
            ]}
          >
            <IconButton
              icon="cog-outline"
              iconColor={MD3Colors.neutral90}
              size={80}
            />
            <Text style={styles.menuText}>Настройки</Text>
          </View>
        </View>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  menu: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  menuButton: {
    backgroundColor: "#c4c4c4",
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderRadius: 10
  },
  menuText: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 0
  }
});
