import React, { ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, usePathname } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token && pathname !== "/login") {
        router.replace("/login");
      }

      setLoading(false);
    };

    checkToken();
  }, [pathname]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
