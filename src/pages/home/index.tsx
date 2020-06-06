import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, View, Text, Image } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { apiIBGE } from "../../services/api";

interface PickerItem {
  key: string;
  label: string;
  value: number;
}

const Home = () => {
  const [ufs, setUfs] = useState<PickerItem[]>([]);
  const [cities, setCities] = useState<PickerItem[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const navigation = useNavigation();
  useEffect(() => {
    apiIBGE.get("estados?orderBy=nome").then((response) => {
      const ufsArr = response.data.map(
        (uf: { id: number; nome: string; sigla: string }) => {
          return {
            key: String(uf.id),
            label: uf.nome,
            value: uf.sigla,
          };
        }
      );
      setUfs(ufsArr);
    });
  }, []);
  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    apiIBGE.get(`estados/${selectedUf}/municipios`).then((response) => {
      const citiesArr = response.data.map(
        (city: { id: number; nome: string }) => {
          return {
            key: String(city.id),
            label: city.nome,
            value: city.nome,
          };
        }
      );
      setCities(citiesArr);
    });
  }, [selectedUf]);
  function handleUfInputChange(value: number) {
    return setSelectedUf(String(value));
  }
  function handleCityInputChange(value: number) {
    return setSelectedCity(String(value));
  }
  function handlenavigateToPoints() {
    return navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  }
  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
        </Text>
      </View>
      <View style={styles.footer}>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{
            label: "Estado",
            value: null,
          }}
          onValueChange={(value) => handleUfInputChange(value)}
          items={ufs}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{
            label: "Cidade",
            value: null,
          }}
          onValueChange={(value) => handleCityInputChange(value)}
          items={cities}
        />
        <RectButton style={styles.button} onPress={handlenavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
