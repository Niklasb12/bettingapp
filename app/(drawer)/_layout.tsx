import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "@/components/CustomDrawer"; // 👈 egen meny

export default function DrawerLayout() {
  return <Drawer drawerContent={(props) => <CustomDrawer {...props} />} />;
}
