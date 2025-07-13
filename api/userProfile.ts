import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/api";

export const getMe = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data;
};
