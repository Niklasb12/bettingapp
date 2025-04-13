import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type User = {
  id: number;
  email: string;
  created_at: string;
};

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://192.168.0.16:3000/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {loading ? (
        <Text>Laddar...</Text>
      ) : (
        users.map((user) => (
          <View key={user.id} style={{ marginBottom: 10 }}>
            <Text>Email: {user.email}</Text>
            <Text>
              Registrerad: {new Date(user.created_at).toLocaleString()}
            </Text>
          </View>
        ))
      )}
      <TouchableOpacity onPress={() => router.push("/login" as any)}>
        <Text>Gå till Login</Text>
      </TouchableOpacity>
    </View>
  );
}
