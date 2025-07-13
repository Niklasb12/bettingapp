import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./register.styles";
import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { register } from "@/api/register"; // Adjust the import path as necessary
import { validateRegisterForm } from "@/validation/register";
import { RegisterFormValues } from "@/types/register";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});
  const [regError, setRegError] = useState<string | null>(null);

  const onPress = async () => {
    const form: RegisterFormValues = {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const formErrors = validateRegisterForm(form);

      if (Object.keys(formErrors).length > 0) {
        alert("här..."); // 👈 Visa loading spinner
        setErrors(formErrors); // 👈 Visa fel i UI
        return;
      }

      const data = await register(form); // gör API-anrop
      router.replace("/login");
    } catch (err) {
      if (err instanceof Error) {
        setRegError(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Firstname"
          onChangeText={setFirstname}
          value={firstname}
        />
        {errors.firstname && (
          <Text style={{ color: "red" }}>{errors.firstname}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Lastname"
          onChangeText={setLastname}
          value={lastname}
        />
        {errors.lastname && (
          <Text style={{ color: "red" }}>{errors.lastname}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        {errors.username && (
          <Text style={{ color: "red" }}>{errors.username}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
        )}
      </View>
      <Text style={{ color: "red", marginTop: 10 }}>{regError}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/login" as any);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
