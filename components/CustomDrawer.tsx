import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe } from "@/api/userProfile";

export default function CustomDrawer(props: any) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getMe();
        setUsername(user.username); // 👈 här!
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Toppdel med profil */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Welcome!</Text>
        <Text style={styles.email}>{username}</Text>
      </View>

      {/* Navigeringslänkar */}
      <View style={styles.links}>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )}
          onPress={() => router.push("/(drawer)/home")}
          focused={props.state.index === 0}
          activeTintColor="#007AFF"
          inactiveTintColor="#888"
          activeBackgroundColor="transparent"
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          onPress={() => router.push("/(drawer)/profile")}
          focused={props.state.index === 1}
          activeTintColor="#007AFF"
          activeBackgroundColor="transparent"
        />
        <DrawerItem
          label="Matches"
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )}
          onPress={() => router.push("/(drawer)/matches")}
          focused={props.state.index === 1}
          activeTintColor="#007AFF"
          activeBackgroundColor="transparent"
        />
      </View>

      {/* Logga ut längst ner */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#888" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  links: {
    flex: 1,
    paddingTop: 10,
    gap: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#888",
  },
});
