import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
      router.replace("/(drawer)/home" as any);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/register" as any);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
