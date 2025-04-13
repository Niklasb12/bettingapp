import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { InteractionManager } from "react-native";
import styles from "./login.styles";
import { login } from "@/api/auth";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = async () => {
    try {
      const data = await login(email, password);
      await AsyncStorage.setItem("token", data.token);
      router.replace("/(tabs)");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Något gick fel");
      }
    }
  };

  return (
    <SafeAreaView style={styles.login}>
      <Text style={styles.text}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Logga in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
