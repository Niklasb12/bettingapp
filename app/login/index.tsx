import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./login.styles";

const Login = () => {
  const onPress = () => {
    console.log("Button pressed");
  };
  return (
    <SafeAreaView style={styles.login}>
      <Text style={styles.text}>Login</Text>
      {/* <Image
        source={require("../../assets/images/oddscope_logo_3.png")}
        style={{ width: "100%", height: 90 }}
        resizeMode="contain"
      /> */}

      <TextInput placeholder="Email" style={styles.textInput} />
      <TextInput placeholder="Password" style={styles.textInput} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Logga in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
