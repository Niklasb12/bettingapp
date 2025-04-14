import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { getMe } from "@/api/userProfile";
import { User } from "@/types/userProfile";

const ProfileInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Text>Laddar användare...</Text>;
  }

  return (
    <View>
      <Text>My Profile</Text>
      <Text>Email: {user.email}</Text>
      <Text>Username: {user.username}</Text>
      <Text>
        Name: {user.firstname} {user.lastname}
      </Text>
    </View>
  );
};

export default ProfileInfo;
